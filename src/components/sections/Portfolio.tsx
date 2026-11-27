import Image from "next/image";
import { useTranslations } from "next-intl";
import SectionLabel from "../ui/SectionLabel";
import CatArt, { CAT_FACE } from "../ui/Cat";
import Slideshow from "../ui/Slideshow";
import { works, caseStudy } from "@/data/projects";
import Reveal from "../ui/Reveal";

export default function Portfolio() {
  const t = useTranslations("Portfolio");


const localizedWorks = works.map((slide, index) => ({
  ...slide,
  alt: t(`worksAlt.${index}`),
  with: slide.with?.map((item, itemIndex) => ({
    ...item,
    alt: t(`mobileWorksAlt.${index}.${itemIndex}`),
  })),
}));


  const localizedBefore = caseStudy.before.map((slide, index) => ({
    ...slide,
    alt: t(`case.beforeAlt.${index}`),
  }));

  const localizedAfter = caseStudy.after.map((slide, index) => ({
    ...slide,
    alt: t(`case.afterAlt.${index}`),
  }));

  const points = t.raw("case.points") as {
    n: string;
    title: string;
    text: string;
  }[];

  return (
    <>
      <section className="section works" id="works">
        <SectionLabel>{t("sectionLabel")}</SectionLabel>

        <Reveal as="h2" className="h2 h2--lime works__title">
          {t("title")}<br />
          {t("titleSecond")}
        </Reveal>

        <p className="works__lead">{t("lead")}</p>

        <div className="works__cat-wrap">
          <CatArt
            className="works__cat"
            src="/images/cat-portfolio.svg"
            {...CAT_FACE}
          />
        </div>

        <div className="works__show">
          <Slideshow
            slides={localizedWorks}
            ratio="16 / 9"
            interval={3500}
            controls
          />
        </div>

        <p className="works__caption">{t("caption")}</p>
      </section>

      <section className="section case" id="before-after">
        <SectionLabel>{t("caseLabel")}</SectionLabel>

        <Reveal as="h2" className="h2 h2--lime case__title">
          {t("caseTitle")}
        </Reveal>

        <p className="case__lead">{t("caseLead")}</p>

        <p className="case__tag">{t("beforeTag")}</p>

        <div className="case__before">
          {localizedBefore.map((s) => (
            <div key={s.src} className="case__img">
              <Image
                src={s.src}
                alt={s.alt}
                fill
                sizes="(min-width: 1440px) 632px, 100vw"
                quality={90}
              />
            </div>
          ))}
        </div>

        <h3 className="case__heading">{t("case.title")}</h3>

        <p className="case__text">{t("case.text")}</p>

        <p className="case__tag">{t("afterTag")}</p>

        <Slideshow
          slides={localizedAfter}
          ratio="1312 / 763"
          controls
        />

        <ul className="case__points">
          {points.map((p) => (
            <li key={p.n}>
              <span>
                {p.n} / {p.title}
              </span>
              <p>{p.text}</p>
            </li>
          ))}
        </ul>

        <p className="case__note">{t("case.note")}</p>
      </section>
    </>
  );
}







