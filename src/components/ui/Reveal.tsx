"use client";

import {
  useEffect,
  useState,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from "react";

type RevealProps = Omit<HTMLAttributes<HTMLElement>, "children"> & {
  as?: ElementType;
  children: ReactNode;
  threshold?: number;
};

export default function Reveal({
  as,
  children,
  className,
  threshold = 0.15,
  ...props
}: RevealProps) {
  const [element, setElement] = useState<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [element, threshold]);

  const Tag = (as ?? "div") as ElementType;

  return (
    <Tag
      {...props}
      ref={setElement}
      className={[
        className,
        isVisible ? "is-visible" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      data-reveal=""
    >
      {children}
    </Tag>
  );
}

