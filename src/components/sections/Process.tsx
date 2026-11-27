import { useTranslations } from "next-intl";
import SectionLabel from "../ui/SectionLabel";
import Reveal from "../ui/Reveal";

type Step = {
  n: string;
  title: string;
  text: string;
};

export default function Process() {
  const t = useTranslations("Process");
  const steps = t.raw("steps") as Step[];

  return (
    <section className="section section--lime" id="process">
      <SectionLabel>{t("sectionLabel")}</SectionLabel>

      <Reveal as="h2" className="h2 process__title">
  {t("title")}
</Reveal>

      <ol className="steps">
        {steps.map((s) => (
          <Reveal
            as="li"
            key={s.n}
            className="step"
          >
            <span className="step__num">
              {s.n}
            </span>

            <h3>{s.title}</h3>

            <p>{s.text}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

