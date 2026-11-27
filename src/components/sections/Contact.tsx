"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import SectionLabel from "../ui/SectionLabel";
import Icon from "../ui/icon/Icon";

const socials = [
  { name: "Behance", icon: "behance", href: "https://www.behance.net/TetianaYashchyna" },
  { name: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/in/tetiana-yashchyshyna-299292380/uk" },
  { name: "Gmail", icon: "google", href: "mailto:tetianayashchyshyna94@gmail.com" },
  { name: "Telegram", icon: "telegram", href: "https://t.me/y_taniart" },
];

type FieldName = "name" | "email" | "need" | "budget" | "message";
type Values = Record<FieldName, string>;
type Errors = Partial<Record<FieldName, string>>;

const initialValues: Values = {
  name: "",
  email: "",
  need: "",
  budget: "",
  message: "",
};

export default function Contact() {
  const t = useTranslations("Contact");

  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [focusedField, setFocusedField] = useState<FieldName | null>(null);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState("");

  const hints: Record<FieldName, string> = {
    name: t("hints.name"),
    email: t("hints.email"),
    need: t("hints.need"),
    budget: t("hints.budget"),
    message: t("hints.message"),
  };

  function validateField(name: FieldName, value: string): string {
    if (name === "name" && !value.trim()) {
      return t("errors.nameRequired");
    }

    if (name === "email") {
      if (!value.trim()) return t("errors.emailRequired");

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return t("errors.emailInvalid");
      }
    }

    if (name === "message" && !value.trim()) {
      return t("errors.messageRequired");
    }

    return "";
  }

  function handleChange(name: FieldName, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }

    setServerError("");
    setSent(false);
  }

  function handleBlur(name: FieldName) {
    setFocusedField(null);
    setTouched((prev) => ({ ...prev, [name]: true }));

    const error = validateField(name, values[name]);
    setErrors((prev) => ({ ...prev, [name]: error }));
  }

  function fieldClass(name: FieldName) {
    return [
      focusedField === name ? "is-focused" : "",
      values[name].trim() ? "is-filled" : "",
      errors[name] ? "is-error" : "",
    ]
      .filter(Boolean)
      .join(" ");
  }

  function fieldFeedback(name: FieldName) {
    if (errors[name]) {
      return (
        <span className="form__hint form__error" id={`${name}-error`}>
          <span aria-hidden="true">!</span>
          {errors[name]}
        </span>
      );
    }

    if (focusedField === name) {
      return (
        <span className="form__hint" id={`${name}-hint`}>
          {hints[name]}
        </span>
      );
    }

    return null;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const nextErrors: Errors = {};

    (Object.keys(initialValues) as FieldName[]).forEach((name) => {
      const error = validateField(name, values[name]);
      if (error) nextErrors[name] = error;
    });

    setTouched({
      name: true,
      email: true,
      need: true,
      budget: true,
      message: true,
    });

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = (Object.keys(initialValues) as FieldName[]).find(
        (name) => nextErrors[name]
      );

      if (firstInvalid) {
        document.getElementById(firstInvalid)?.focus();
      }

      return;
    }

    setSending(true);
    setServerError("");
    setSent(false);

    try {
      const response = await fetch("/api/send-inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(t("serverErrorFallback"));
      }

      setSent(true);
      setValues(initialValues);
      setErrors({});
      setTouched({});
    } catch {
      setServerError(t("serverError"));
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="section section--lime contact" id="brief">
      <div className="contact__left">
        <SectionLabel>{t("sectionLabel")}</SectionLabel>

        <h2 className="h2">
          {t("title")}
        </h2>

        <p>{t("description")}</p>

        <ul className="socials">
          {socials.map((s) => {
            const isMail = s.href.startsWith("mailto:");

            return (
              <li key={s.name}>
                <a
                  href={s.href}
                  aria-label={s.name}
                  {...(isMail
                    ? {}
                    : { target: "_blank", rel: "noopener noreferrer" })}
                >
                  <span>
                    <Icon name={s.icon} />
                  </span>
                  {s.name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <form className="form" onSubmit={onSubmit} noValidate>
        <h3>{t("formTitle")}</h3>

        <div className="form__row">
          <label className={fieldClass("name")}>
            {t("fields.name")} *
            <input
              id="name"
              name="name"
              required
              maxLength={100}
              placeholder={t("placeholders.name")}
              value={values.name}
              onFocus={() => setFocusedField("name")}
              onBlur={() => handleBlur("name")}
              onChange={(e) => handleChange("name", e.target.value)}
              aria-invalid={!!errors.name}
              aria-describedby={
                errors.name ? "name-error" :
                focusedField === "name" ? "name-hint" : undefined
              }
            />
            {fieldFeedback("name")}
          </label>

          <label className={fieldClass("email")}>
            {t("fields.email")} *
            <input
              id="email"
              name="email"
              type="email"
              required
              maxLength={254}
              placeholder={t("placeholders.email")}
              value={values.email}
              onFocus={() => setFocusedField("email")}
              onBlur={() => handleBlur("email")}
              onChange={(e) => handleChange("email", e.target.value)}
              aria-invalid={!!errors.email}
              aria-describedby={
                errors.email ? "email-error" :
                focusedField === "email" ? "email-hint" : undefined
              }
            />
            {fieldFeedback("email")}
          </label>
        </div>

        <label className={fieldClass("need")}>
          {t("fields.need")}
          <input
            id="need"
            name="need"
            maxLength={200}
            placeholder={t("placeholders.need")}
            value={values.need}
            onFocus={() => setFocusedField("need")}
            onBlur={() => handleBlur("need")}
            onChange={(e) => handleChange("need", e.target.value)}
          />
          {fieldFeedback("need")}
        </label>

        <label className={fieldClass("budget")}>
          {t("fields.budget")}
          <input
            id="budget"
            name="budget"
            maxLength={100}
            placeholder={t("placeholders.budget")}
            value={values.budget}
            onFocus={() => setFocusedField("budget")}
            onBlur={() => handleBlur("budget")}
            onChange={(e) => handleChange("budget", e.target.value)}
          />
          {fieldFeedback("budget")}
        </label>

        <label className={fieldClass("message")}>
          {t("fields.message")} *
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            maxLength={5000}
            placeholder={t("placeholders.message")}
            value={values.message}
            onFocus={() => setFocusedField("message")}
            onBlur={() => handleBlur("message")}
            onChange={(e) => handleChange("message", e.target.value)}
            aria-invalid={!!errors.message}
            aria-describedby={
              errors.message ? "message-error" :
              focusedField === "message" ? "message-hint" : undefined
            }
          />
          {fieldFeedback("message")}
        </label>

        <button type="submit" className="form__submit" disabled={sending}>
          {sending
            ? t("sending")
            : sent
              ? t("successButton")
              : `${t("submit")}`}
        </button>

        {sent && (
          <p className="form__note" role="status">
            {t("successMessage")}
          </p>
        )}

        {serverError && (
          <p className="form__note form__server-error" role="alert">
            {serverError}
          </p>
        )}

        <p className="form__note">{t("formNote")}</p>
      </form>
    </section>
  );
}


