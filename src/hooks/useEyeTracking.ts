"use client";

import { useEffect } from "react";

export function useEyeTracking() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const eyes = Array.from(document.querySelectorAll<Element>("[data-eye]"));
    if (!eyes.length) return;

    let x = 0;
    let y = 0;
    let raf = 0;

    const update = () => {
      raf = 0;
      eyes.forEach((eye) => {
        const pupil = eye.querySelector<SVGElement | HTMLElement>("[data-pupil]");
        if (!pupil) return;

        if (eye instanceof SVGElement) {
          const white = eye.firstElementChild as SVGGraphicsElement | null;
          const svg = eye.ownerSVGElement;
          if (!white || !svg) return;
          const box = white.getBoundingClientRect();
          const k = svg.getBoundingClientRect().width / svg.viewBox.baseVal.width;
          if (!k) return;
          const dx = x - (box.left + box.width / 2);
          const dy = y - (box.top + box.height / 2);
          const dist = Math.hypot(dx, dy) || 1;
          const max = Number(eye.getAttribute("data-range") ?? 3);
          const move = Math.min(max, dist / (k * 8));
          pupil.style.transform = `translate(${(dx / dist) * move}px, ${(dy / dist) * move}px)`;
        } else {
          const box = eye.getBoundingClientRect();
          const dx = x - (box.left + box.width / 2);
          const dy = y - (box.top + box.height / 2);
          const dist = Math.hypot(dx, dy) || 1;
          const t = Math.min(1, dist / (box.width * 3));   
          const mx = box.width * 0.22;
          const my = box.height * 0.2;
          pupil.style.transform = `translate(${(dx / dist) * mx * t}px, ${(dy / dist) * my * t}px)`;
        }
      });
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(update);
    };

    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
}