"use client";

/**
 * Dry Gin — la vraie photo, mise en scène three.js.
 * Aucune reconstruction, aucune rotation d'images : le packshot réel (net à
 * 100%, toujours) posé dans une scène WebGL — reflet au sol qui s'évanouit,
 * poussière d'or en dérive lente, inclinaison parallaxe qui suit le curseur
 * (la bouteille et la poussière bougent à des vitesses différentes = vraie
 * profondeur), flottement discret.
 * prefers-reduced-motion : scène statique.
 */

import { useEffect, useRef } from "react";

export function FableBottle3D() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let disposed = false;
    let rafId = 0;
    let cleanup: (() => void) | undefined;

    (async () => {
      const THREE = await import("three");
      if (disposed) return;

      // --- The real packshot ---
      const img = new Image();
      img.src = "/assets/hero/drygin-tex.png";
      await new Promise((res, rej) => { img.onload = res; img.onerror = rej; });
      if (disposed) return;

      const bottleTex = new THREE.Texture(img);
      bottleTex.needsUpdate = true;
      bottleTex.colorSpace = THREE.SRGBColorSpace;
      bottleTex.anisotropy = 8;

      const H = 2.6;
      const W = H * (img.width / img.height);
      const bottle = new THREE.Mesh(
        new THREE.PlaneGeometry(W, H),
        new THREE.MeshBasicMaterial({ map: bottleTex, transparent: true })
      );

      // --- Fading floor reflection (flipped copy, alpha gradient baked in) ---
      const rc = document.createElement("canvas");
      rc.width = img.width; rc.height = img.height;
      const rctx = rc.getContext("2d")!;
      rctx.translate(0, img.height);
      rctx.scale(1, -1);
      rctx.drawImage(img, 0, 0);
      rctx.setTransform(1, 0, 0, 1, 0, 0);
      rctx.globalCompositeOperation = "destination-in";
      const rg = rctx.createLinearGradient(0, 0, 0, img.height * 0.55);
      rg.addColorStop(0, "rgba(0,0,0,0.32)");
      rg.addColorStop(1, "rgba(0,0,0,0)");
      rctx.fillStyle = rg;
      rctx.fillRect(0, 0, img.width, img.height);
      const reflTex = new THREE.CanvasTexture(rc);
      reflTex.colorSpace = THREE.SRGBColorSpace;
      const reflection = new THREE.Mesh(
        new THREE.PlaneGeometry(W, H),
        new THREE.MeshBasicMaterial({ map: reflTex, transparent: true, depthWrite: false })
      );
      reflection.position.y = -H - 0.015;
      reflection.scale.y = 0.9;

      // --- Gold dust — two layers at different depths for parallax ---
      const makeDust = (count: number, spread: number, z0: number, z1: number, size: number, color: string) => {
        const pos: number[] = [];
        for (let i = 0; i < count; i++) {
          pos.push((Math.random() - 0.5) * spread, (Math.random() - 0.5) * (H + 1.4), z0 + Math.random() * (z1 - z0));
        }
        const g = new THREE.BufferGeometry();
        g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
        const m = new THREE.PointsMaterial({ color, size, transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true });
        return new THREE.Points(g, m);
      };
      const dustBack = makeDust(160, 4.6, -1.6, -0.4, 0.022, "#d8c4a0");
      const dustFront = makeDust(60, 4.2, 0.35, 1.1, 0.03, "#e8d7b4");

      const bottleGroup = new THREE.Group();
      bottleGroup.add(bottle);
      bottleGroup.add(reflection);

      const group = new THREE.Group();
      group.add(bottleGroup);
      group.add(dustBack);
      group.add(dustFront);
      // sit the bottle's base near the lower third so the reflection breathes
      group.position.y = 0.28;

      const scene = new THREE.Scene();
      scene.add(group);
      const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 30);
      camera.position.set(0, 0.1, 5.6);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.domElement.style.display = "block";
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      host.appendChild(renderer.domElement);

      const size = () => {
        const w = host.clientWidth, h = host.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      size();
      const ro = new ResizeObserver(size);
      ro.observe(host);

      // --- Cursor parallax: bottle tilts, dust counter-drifts = depth ---
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let tx = 0, ty = 0, rx = 0, ry = 0;
      const move = (e: PointerEvent) => {
        if (reduce) return;
        const r = host.getBoundingClientRect();
        tx = ((e.clientX - r.left) / r.width - 0.5);
        ty = ((e.clientY - r.top) / r.height - 0.5);
      };
      const leave = () => { tx = 0; ty = 0; };
      host.addEventListener("pointermove", move);
      host.addEventListener("pointerleave", leave);

      let t = 0;
      const loop = () => {
        t += 0.016;
        rx += (tx - rx) * 0.055;
        ry += (ty - ry) * 0.055;
        bottleGroup.rotation.y = rx * 0.30;
        bottleGroup.rotation.x = -ry * 0.14;
        bottleGroup.position.x = rx * 0.18;
        dustBack.position.x = -rx * 0.5;
        dustBack.position.y = ry * 0.3;
        dustFront.position.x = rx * 0.7;
        dustFront.position.y = -ry * 0.42;
        if (!reduce) {
          bottleGroup.position.y = Math.sin(t * 0.5) * 0.045;
          dustBack.rotation.y = t * 0.02;
          dustFront.rotation.y = -t * 0.028;
          (dustFront.material as { opacity: number }).opacity = 0.4 + Math.sin(t * 1.3) * 0.2;
        }
        renderer.render(scene, camera);
        rafId = requestAnimationFrame(loop);
      };
      rafId = requestAnimationFrame(loop);

      cleanup = () => {
        ro.disconnect();
        host.removeEventListener("pointermove", move);
        host.removeEventListener("pointerleave", leave);
        bottle.geometry.dispose(); (bottle.material as { dispose(): void }).dispose(); bottleTex.dispose();
        reflection.geometry.dispose(); (reflection.material as { dispose(): void }).dispose(); reflTex.dispose();
        for (const d of [dustBack, dustFront]) { d.geometry.dispose(); (d.material as { dispose(): void }).dispose(); }
        renderer.dispose();
        renderer.domElement.remove();
      };
    })().catch(() => { /* WebGL unavailable — section text still stands on its own */ });

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      cleanup?.();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      aria-label="Bouteille Dry Gin — photo réelle en scène 3D"
      style={{ position: "relative", width: "100%", aspectRatio: "4/5", touchAction: "pan-y" }}
    />
  );
}
