import { useTranslations } from "next-intl";
import SectionLabel from "../ui/SectionLabel";
import FAQItem from "../ui/FAQItem";
import CatArt from "../ui/Cat";
import type { FAQ } from "@/data/faq";
import Reveal from "../ui/Reveal";

export default function FAQ() {
  const t = useTranslations("FAQ");
  const faqs = t.raw("items") as FAQ[];

  return (
    <section className="section section--light faq" id="faq">
      <div className="faq__left">
        <SectionLabel>{t("sectionLabel")}</SectionLabel>

        <Reveal as="h2" className="h2">
          {t("title")}
        </Reveal>

        <p>{t("subtitle")}</p>

        <CatArt
          className="faq__cat"
          src="/images/cat-faq.svg"
          eyes={[
            { x: 25.5, y: 10.8, w: 6, ratio: 1.7 },
            { x: 38.2, y: 10.8, w: 6, ratio: 1.7 },
          ]}
          mouth={{ x: 31.7, y: 17, w: 14.9 }}
        />
      </div>

      <div className="faq__list">
        {faqs.map((f) => (
          <FAQItem key={f.id} item={f} />
        ))}
      </div>
    </section>
  );
}



