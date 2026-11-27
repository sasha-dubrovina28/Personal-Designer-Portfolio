"use client";

import { useTransition, useOptimistic } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const labels: Record<string, string> = {
  uk: "Ua",
  ua: "Ua",
  en: "En",
};

export default function LanguageSwitcher({
  className,
}: {
  className?: string;
}) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [pending, startTransition] = useTransition();

  const [activeLocale, setActiveLocale] = useOptimistic(locale);


  const locales = [...routing.locales].sort(
    (a, b) => Number(a === "en") - Number(b === "en")
  );

  function change(next: string) {
    if (next === activeLocale || pending) return;

    startTransition(() => {
      setActiveLocale(next);

      router.replace(pathname, {
        locale: next as (typeof routing.locales)[number],
        scroll: false,
      });
    });
  }

  return (
    <div
      className={cn("lang", className)}
      role="group"
      aria-label="Language"
    >
      {locales.map((code) => (
        <button
          key={code}
          type="button"
          lang={code}
          className={cn(
            "lang__btn",
            code === activeLocale && "is-active"
          )}
          aria-pressed={code === activeLocale}
          disabled={pending}
          onClick={() => change(code)}
        >
          {labels[code] ?? code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
