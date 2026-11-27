"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { FAQ } from "@/data/faq";

export default function FAQItem({ item }: { item: FAQ }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("faq-item", open && "is-open")}>
      <button className="faq-item__head" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span className="faq-item__num">{item.id}</span>
        <span className="faq-item__q">{item.question}</span>
      </button>
      <div className="faq-item__body">
        <p>{item.answer}</p>
      </div>
    </div>
  );
}