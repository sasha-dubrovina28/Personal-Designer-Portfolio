import { useTranslations } from "next-intl";

export default function Navigation({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {
  const t = useTranslations("Navigation");

const left = [
  { label: t("about"), href: "#about" },
  { label: t("services"), href: "#services" },
  { label: t("works"), href: "#works" },
];

const right = [
  { label: t("process"), href: "#process" },
  { label: t("faq"), href: "#faq" },
  { label: t("brief"), href: "#brief" },
];

  return (
    <nav id="site-navigation" className="nav" aria-label={t("label")}>
      <ul>
        {left.map((item) => (
          <li key={item.href}>
            <a href={item.href} onClick={onNavigate}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <span className="nav__spacer" aria-hidden="true" />

      <ul>
        {right.map((item) => (
          <li key={item.href}>
            <a href={item.href} onClick={onNavigate}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

