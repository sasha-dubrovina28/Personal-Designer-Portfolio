import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Navigation");
  const footer = useTranslations("Footer");

  const links = [
    { label: t("about"), href: "#about" },
    { label: t("services"), href: "#services" },
    { label: t("works"), href: "#works" },
    { label: t("process"), href: "#process" },
    { label: t("faq"), href: "#faq" },
    { label: t("brief"), href: "#brief" },
  ];

  return (
    <footer className="footer">
      <a
        href="#top"
        className="footer__logo"
        aria-label="Tetiana Yashchyshyna"
      >
        <Image src="/icons/logo.svg" alt="" width={56} height={56} />
      </a>

      <div className="footer__body">
        <ul>
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>

        <p>{footer("copyright")}</p>
      </div>
    </footer>
  );
}
