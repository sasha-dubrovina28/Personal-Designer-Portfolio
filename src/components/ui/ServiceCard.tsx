import { useTranslations } from "next-intl";
import Button from "./Button";
import type { Service } from "@/data/services";
import Reveal from "./Reveal";

export default function ServiceCard({
  service,
}: {
  service: Service;
}) {
  const t = useTranslations("Services");

  return (
    <Reveal as="article" className="service">
      <span className="service__num">
        {service.id}
      </span>

      <div className="service__main">
        <h3>{service.title}</h3>
        <p>{service.description}</p>
      </div>

      <div className="service__pack">
        <p className="service__pack-name">
          {service.packageName}
        </p>

        <ul>
          {service.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </div>

      <div className="service__price">
        <p className="service__price-value">
          {service.price}
        </p>

        <p className="service__timeline">
          {service.timeline}
        </p>

        <Button href="#brief">
          {t("cta")}
        </Button>
      </div>
    </Reveal>
  );
}

