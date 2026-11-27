import { useTranslations } from "next-intl";
import SectionLabel from "../ui/SectionLabel";
import ServiceCard from "../ui/ServiceCard";
import type { Service } from "@/data/services";
import Reveal from "../ui/Reveal";

export default function Services() {
  const t = useTranslations("Services");
  const services = t.raw("items") as Service[];

  return (
    <section className="section section--light" id="services">
      <SectionLabel>{t("sectionLabel")}</SectionLabel>

      <div className="services__head">
        <Reveal as="h2" className="h2">
          {t("title")}<br />
          {t("titleSecond")}
        </Reveal>

        <p>{t("description")}</p>
      </div>

      <div className="services__list">
        {services.map((s) => (
          <ServiceCard key={s.id} service={s} />
        ))}
      </div>

      <p className="note">{t("note")}</p>
    </section>
  );
}

