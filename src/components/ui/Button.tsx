import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
  icon?: boolean;
  className?: string;
};

export default function Button({
  href,
  children,
  variant = "primary",
  icon,
  className,
}: Props) {
  const classes = cn("btn", `btn--${variant}`, className);

  const content = (
    <>
      {icon && <span className="btn__dot" aria-hidden />}
      {children}
    </>
  );

  if (href.startsWith("#")) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
