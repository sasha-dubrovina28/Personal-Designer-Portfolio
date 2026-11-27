"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import SectionLabel from "../ui/SectionLabel";
import { cn } from "@/lib/utils";
import Reveal from "../ui/Reveal";

export default function About() {
  const [revealed, setRevealed] = useState(false);
  const t = useTranslations("About");

  return (
    <section className="section section--dark about" id="about">
      <SectionLabel>{t("sectionLabel")}</SectionLabel>

      <div className="about__grid">
        <Reveal as="div" className="about__card-wrap">
          <div className="about__card">
            <p className="about__chips">
              <span>{t("chips.brand")}</span>
              <span>{t("chips.visual")}</span>
              <span>{t("chips.detail")}</span>
            </p>

            <h3>{t("cardTitle")}</h3>

            <p className="about__card-sub">
              {t("cardSubtitle")}
            </p>
          </div>

          <button
            type="button"
            className={cn(
              "about__figure",
              revealed && "is-revealed"
            )}
            onClick={() => setRevealed((v) => !v)}
            aria-pressed={revealed}
            aria-label={t("showPhoto")}
          >
            <Image
              className="about__figure-q"
              src="/about/hand.svg"
              alt=""
              width={440}
              height={580}
              unoptimized
            />

            <Image
              className="about__figure-lime"
              src="/about/hand-lime.svg"
              alt=""
              width={440}
              height={580}
              unoptimized
            />

            <Image
              className="about__figure-photo"
              src="/about/photo.png"
              alt="Tetiana"
              width={440}
              height={580}
              unoptimized
            />
          </button>
        </Reveal>

        <Reveal as="div" className="about__text">
          <h2 className="h2 h2--lime">
            {t("title")}<br />
            {t("subtitle")}
          </h2>

          <p>{t("paragraph1")}</p>
          <p>{t("paragraph2")}</p>
          <p>{t("paragraph3")}</p>

          <p className="about__focus">
            {t("focus")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
