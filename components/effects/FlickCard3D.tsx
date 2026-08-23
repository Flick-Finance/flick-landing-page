"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { paintCardFace, readFontStacks, waitForFaceFonts } from "./card-face";
import { prefersReducedMotion, subscribeToPointer } from "./pointer-engine";

/** ISO/IEC 7810 ID-1 proportions, in scene units. */
const CARD_WIDTH = 3.42;
const CARD_HEIGHT = 2.16;
const CARD_DEPTH = 0.11;
const CARD_RADIUS = 0.14;

const DRIFT_PERIOD_MS = 6000;
const FLOAT_PERIOD_MS = 4200;
const MAX_DRIFT = Math.PI / 90; // ±2°

/**
 * The card object — the only depicted thing in the system, rendered as
 * anodised hardware rather than an illustration.
 *
 * `three` is behind a dynamic import so it never lands in the initial bundle,
 * and a CSS card is painted first so the hero has an object at first paint and
 * keeps one if WebGL is unavailable.
 */
export function FlickCard3D() {
  const stageRef = useRef<HTMLButtonElement>(null);
  const hostRef = useRef<HTMLSpanElement>(null);
  const flipTarget = useRef(0);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    const host = hostRef.current;
    if (!stage || !host) return;

    let disposed = false;
    const teardown: Array<() => void> = [];

    async function boot() {
      const [THREE, { RoomEnvironment }] = await Promise.all([
        import("three"),
        import("three/examples/jsm/environments/RoomEnvironment.js"),
      ]);
      if (disposed) return;

      const fonts = readFontStacks();
      await waitForFaceFonts(fonts);
      if (disposed) return;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      } catch {
        return; // No WebGL — the static fallback stays.
      }

      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      renderer.domElement.className = "block size-full";
      host!.appendChild(renderer.domElement);

      const scene = new THREE.Scene();

      // An HDRI environment is non-negotiable for the anodised read.
      const pmrem = new THREE.PMREMGenerator(renderer);
      const environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      scene.environment = environment;
      scene.environmentIntensity = 0.6;

      const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
      camera.position.set(0, 0, 9.2);

      scene.add(new THREE.AmbientLight(0xffffff, 0.15));
      const key = new THREE.DirectionalLight(0xffffff, 2.1);
      key.position.set(-3, 4, 6);
      const rim = new THREE.DirectionalLight(0x00c48c, 3.4);
      rim.position.set(5, 0.5, 1.5);
      const fill = new THREE.DirectionalLight(0x9fc7ff, 0.5);
      fill.position.set(2, -3, 4);
      scene.add(key, rim, fill);

      const halfWidth = CARD_WIDTH / 2;
      const halfHeight = CARD_HEIGHT / 2;
      const outline = new THREE.Shape();
      outline.moveTo(-halfWidth + CARD_RADIUS, -halfHeight);
      outline.lineTo(halfWidth - CARD_RADIUS, -halfHeight);
      outline.quadraticCurveTo(halfWidth, -halfHeight, halfWidth, -halfHeight + CARD_RADIUS);
      outline.lineTo(halfWidth, halfHeight - CARD_RADIUS);
      outline.quadraticCurveTo(halfWidth, halfHeight, halfWidth - CARD_RADIUS, halfHeight);
      outline.lineTo(-halfWidth + CARD_RADIUS, halfHeight);
      outline.quadraticCurveTo(-halfWidth, halfHeight, -halfWidth, halfHeight - CARD_RADIUS);
      outline.lineTo(-halfWidth, -halfHeight + CARD_RADIUS);
      outline.quadraticCurveTo(-halfWidth, -halfHeight, -halfWidth + CARD_RADIUS, -halfHeight);

      const bodyGeometry = new THREE.ExtrudeGeometry(outline, {
        depth: CARD_DEPTH,
        bevelEnabled: true,
        bevelSize: 0.016,
        bevelThickness: 0.016,
        bevelSegments: 4,
        curveSegments: 24,
      });
      const bodyMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x0b1620,
        roughness: 0.35,
        metalness: 0.9,
        clearcoat: 0.3,
        clearcoatRoughness: 0.25,
      });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      body.position.z = -CARD_DEPTH / 2;

      const group = new THREE.Group();
      group.add(body);

      const faceGeometry = new THREE.PlaneGeometry(
        CARD_WIDTH - 0.05,
        CARD_HEIGHT - 0.05,
      );
      const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();

      const faces = (["front", "back"] as const).map((side) => {
        const texture = new THREE.CanvasTexture(paintCardFace(side, fonts));
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = maxAnisotropy;

        const material = new THREE.MeshPhysicalMaterial({
          map: texture,
          transparent: true,
          roughness: 0.42,
          metalness: 0.25,
          clearcoat: 0.45,
          clearcoatRoughness: 0.18,
        });

        const mesh = new THREE.Mesh(faceGeometry, material);
        mesh.position.z =
          side === "front" ? CARD_DEPTH / 2 + 0.022 : -CARD_DEPTH / 2 - 0.022;
        mesh.rotation.y = side === "front" ? 0 : Math.PI;
        group.add(mesh);

        return { texture, material };
      });

      scene.add(group);

      const resize = () => {
        const rect = stage!.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        renderer.setSize(rect.width, rect.height, false);
        camera.aspect = rect.width / rect.height;
        camera.fov = rect.width < 520 ? 36 : 30;
        camera.updateProjectionMatrix();
      };
      resize();

      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(stage!);

      let visible = true;
      const visibilityObserver = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
        },
        { rootMargin: "120px" },
      );
      visibilityObserver.observe(stage!);

      const reduced = prefersReducedMotion();
      const start = performance.now();
      let flip = 0;

      const unsubscribe = subscribeToPointer(({ tiltX, tiltY }) => {
        flip += (flipTarget.current - flip) * 0.08;
        if (!visible) return;

        const elapsed = performance.now() - start;
        const drift = reduced
          ? 0
          : Math.sin((elapsed / DRIFT_PERIOD_MS) * Math.PI * 2) * MAX_DRIFT;

        group.rotation.y = flip + (reduced ? 0 : tiltX * 0.55 + drift);
        group.rotation.x = reduced ? 0 : -tiltY * 0.32;
        group.rotation.z = -0.06 + (reduced ? 0 : drift * 0.6);
        group.position.y = reduced
          ? 0
          : Math.sin((elapsed / FLOAT_PERIOD_MS) * Math.PI * 2) * 0.06;

        renderer.render(scene, camera);
      });

      setLive(true);

      teardown.push(() => {
        unsubscribe();
        resizeObserver.disconnect();
        visibilityObserver.disconnect();
        bodyGeometry.dispose();
        bodyMaterial.dispose();
        faceGeometry.dispose();
        for (const face of faces) {
          face.texture.dispose();
          face.material.dispose();
        }
        environment.dispose();
        pmrem.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      });
    }

    void boot();

    return () => {
      disposed = true;
      for (const dispose of teardown) dispose();
    };
  }, []);

  return (
    <button
      ref={stageRef}
      type="button"
      aria-label="Flip the card to see the back"
      className="relative block size-full cursor-pointer border-none bg-transparent p-0"
      onClick={() => {
        flipTarget.current = flipTarget.current ? 0 : Math.PI;
      }}
    >
      <span ref={hostRef} className="absolute inset-0 block" />

      {/* Kept in the tree but faded once the mesh takes over, so the swap
          never reflows the hero. */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-opacity duration-280",
          live && "opacity-0",
        )}
      >
        <span className="aspect-[1.586] w-[min(340px,80%)] -rotate-6 rounded-xl border border-bone-100/12 bg-card-object shadow-card" />
      </span>
    </button>
  );
}
