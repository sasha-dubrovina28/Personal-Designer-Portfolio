"use client";

import { useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Button from "../ui/Button";
import CatArt, { CAT_FACE } from "../ui/Cat";

gsap.registerPlugin(useGSAP);
let hasPlayedIntro = false;

export default function Hero() {
  const t = useTranslations("Hero");
  const locale = useLocale();
  const isUk = locale === "uk" || locale === "ua";

  const heroRef = useRef<HTMLElement>(null);
  const backRef = useRef<HTMLSpanElement>(null);
  const frontRef = useRef<HTMLSpanElement>(null);
  const lastWordRef = useRef<HTMLSpanElement>(null);
  const echoRef = useRef<HTMLSpanElement>(null);

  const words = t("accent").trim().split(/\s+/);
  const lastWord = words.pop() || "";
  const firstWords = words.join(" ");

  useGSAP(() => {
    const back = backRef.current;
    const front = frontRef.current;
    const last = lastWordRef.current;
    const echo = echoRef.current;

    if (!back || !front || !last) return;

    const mm = gsap.matchMedia();

    mm.add({
      desktop: "(min-width: 768px)",
      mobile: "(width < 768px)",
      reducedMotion: "(prefers-reduced-motion: reduce)",
    }, (context) => {
      const { mobile, reducedMotion } = context.conditions!;

      const backFinal = {
        scale: mobile ? 41 / 34 : 152 / 129,
        y: mobile ? "4vw" : "0vw",
        transformOrigin: "left top",
      };

      const frontFinal = {
        scale: mobile
          ? (isUk ? 78 / 59 : 83 / 68)
          : (isUk ? 288 / 224 : 329 / 257),
         y: mobile ? "5vw" : isUk ? "5.5vw" : "1.3vw",
        transformOrigin: "center top",
      };

      gsap.set(last, { opacity: 1 });
      if (echo) gsap.set(echo, { opacity: 0, yPercent: -20 });

      if (hasPlayedIntro || reducedMotion) {
        hasPlayedIntro = true;
        gsap.set(back, backFinal);
        gsap.set(front, frontFinal);
        return;
      }

      const timeline = gsap.timeline({
        delay: 0.25,
        repeat: 0,
        defaults: { duration: 3, ease: "power2.inOut" },
        onStart: () => { hasPlayedIntro = true; },
      });

      timeline.fromTo(back, {
        scale: 1,
        y: 0,
        transformOrigin: "left top",
      }, backFinal, 0);

      timeline.fromTo(front, {
        scale: 1,
        y: 0,
        transformOrigin: "center center",
      }, frontFinal, 0);

      if (mobile && echo && firstWords) {
        timeline.to(last, { opacity: 0.25, duration: 0.65 }, 0.35);
        timeline.to(echo, {
          opacity: 0.85,
          yPercent: 0,
          duration: 0.8,
          ease: "power2.out",
        }, 0.35);
        timeline.to(last, { opacity: 1, duration: 0.9 }, 1.6);
        timeline.to(echo, {
          opacity: 0,
          yPercent: -20,
          duration: 0.9,
        }, 1.6);
      }
    });

    return () => mm.revert();
  }, {
    scope: heroRef,
    dependencies: [locale],
    revertOnUpdate: true,
  });

  return (
    <section ref={heroRef} className="hero" id="top" data-locale={locale}>
      <ul className="hero__tags">
        <li>{t("tagline")}</li>
        <li><span className="dot" />{t("status")}</li>
      </ul>

      <h1 className="hero__title">
        <span ref={backRef} className="hero__line">
          {t("headline")}<br />{t("headlineSecond")}
        </span>
        <span ref={frontRef} className="hero__accent">
          <span className="hero__accent-main">
            {firstWords}{firstWords && " "}
            <span ref={lastWordRef} className="hero__accent-last">{lastWord}</span>
          </span>
          {firstWords && (
            <span ref={echoRef} className="hero__accent-echo" aria-hidden="true">
              {lastWord}
            </span>
          )}
        </span>
      </h1>

      <div className="hero__side">
        <p>{t("description")}</p>
        <Button href="#brief" icon className="btn--wide">{t("create")}</Button>
        <Button href="#works" variant="outline" className="btn--wide">{t("portfolio")}</Button>
      </div>

      <CatArt className="hero__cat" src="/images/cat.svg" {...CAT_FACE} />
    </section>
  );
}



