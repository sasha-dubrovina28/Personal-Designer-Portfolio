
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Navigation from "./Navigation";
import Button from "../ui/Button";
import { CatHead } from "../ui/Cat";
import { cn } from "@/lib/utils";
import Image from "next/image";
import LanguageSwitcher from "../ui/LanguageSwitcher";

export default function Header() {
  const [open, setOpen] = useState(false);

  const t = useTranslations("Header");
  const nav = useTranslations("Navigation");

  const menu = [
    { label: nav("about"), href: "#about" },
    { label: nav("services"), href: "#services" },
    { label: nav("works"), href: "#works" },
    { label: nav("process"), href: "#process" },
    { label: nav("faq"), href: "#faq" },
    { label: nav("brief"), href: "#brief" },
  ];

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    document.body.classList.toggle("menu-open", open);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);

    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <>
      <header className="header">
        <button
          type="button"
          className="header__burger"
          aria-label={open ? t("closeMenu") : t("openMenu")}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M5 5l14 14M19 5L5 19"
                stroke="currentColor"
                strokeWidth="2.5"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M3 6h18M3 12h18M3 18h18"
                stroke="currentColor"
                strokeWidth="2.5"
              />
            </svg>
          )}
        </button>

        <Link
          href="#top"
          className="header__logo"
          aria-label={t("logoLabel")}
        >
          <Image
            src="/icons/logo.svg"
            alt=""
            width={36}
            height={36}
            priority
          />
          <span>Tetiana Yashchyshyna</span>
        </Link>

        <Navigation />

        <CatHead className="header__cat" />

        <Button href="#brief" icon className="header__cta">
          {t("create")}
        </Button>
        <LanguageSwitcher className="header__lang" />
      </header>

      <div
        id="mobile-menu"
        className={cn("mobile-menu", open && "is-open")}
      >
        <div
          className="mobile-menu__overlay"
          onClick={() => setOpen(false)}
        />

        <nav
          className="mobile-menu__panel"
          aria-label={nav("mobileLabel")}
        >
          <ul>
            {menu.map((m) => (
              <li key={m.href}>
                <a
                  href={m.href}
                  onClick={() => setOpen(false)}
                >
                  {m.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}





