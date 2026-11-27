"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { cn } from "@/lib/utils";
import type { Slide } from "@/data/projects";

type SlideGroup = Slide[];

function groupSlides(slides: Slide[]): SlideGroup[] {
  return slides.map((slide) =>
    slide.with?.length
      ? [
          { ...slide, fit: "contain" as const },
          ...slide.with.map((extra) => ({
            ...extra,
            fit: "contain" as const,
          })),
        ]
      : [slide]
  );
}

function GroupView({ group }: { group: SlideGroup }) {
  return (
    <div
      className={cn("slideshow__group", group.length >= 2 && "is-pair")}
      style={
        group.length >= 2
          ? {
              gridTemplateColumns: `repeat(${group.length}, minmax(0, 1fr))`,
            }
          : undefined
      }
    >
      {group.map((slide) => (
        <div className="slideshow__item" key={slide.src}>
          <Image
            className={cn(
              "slideshow__slide",
              slide.fit === "contain" && "is-contain"
            )}
            src={slide.src}
            alt={slide.alt}
            fill
            sizes={
              group.length >= 2
                ? `(max-width: 767px) ${Math.round(100 / group.length)}vw, ${Math.round(1312 / group.length)}px`
                : "(max-width: 767px) 100vw, 1312px"
            }
            quality={90}
          />
        </div>
      ))}
    </div>
  );
}

function Arrow({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg viewBox="0 0 50 56" aria-hidden="true" focusable="false">
      <path
        d={dir === "prev" ? "M48 2 2 28l46 26z" : "M2 2l46 26L2 54z"}
        fill="currentColor"
      />
    </svg>
  );
}

export default function Slideshow({
  slides,
  ratio = "16 / 9",
  interval = 4500,
  className,
  controls = false,
}: {
  slides: Slide[];
  ratio?: string;
  interval?: number;
  className?: string;
  controls?: boolean;
}) {

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const inViewRef = useRef(false);
  const reduceRef = useRef(false);

  const groups = useMemo(() => groupSlides(slides), [slides]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);


  useEffect(() => {
    const element = wrapRef.current;
    if (!element) return;

    reduceRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
        const autoplay = swiperRef.current?.autoplay;
        if (!autoplay) return;
        if (entry.isIntersecting && !reduceRef.current) autoplay.start();
        else autoplay.stop();
      },
      { threshold: 0.4 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const activeGroup = groups[active] ?? groups[0] ?? [];
  const activeIsMulti = activeGroup.length >= 2;
  const showControls = controls && groups.length > 1;

  return (
    <div ref={wrapRef} className={cn("slideshow-wrap", className)}>
      <div
        className="slideshow"
        style={{ aspectRatio: activeIsMulti && isMobile ? "4 / 3" : ratio }}
        aria-label="Selected design projects"
      >
        {mounted ? (
        <Swiper
          className="slideshow__swiper"
          modules={[A11y, Autoplay, Keyboard]}
          slidesPerView={1}
          speed={700}
          rewind
          grabCursor
          keyboard={{ enabled: true }}
          autoplay={
            groups.length > 1
              ? {
                  delay: interval,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }
              : false
          }
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            if (inViewRef.current && !reduceRef.current) swiper.autoplay?.start();
            else swiper.autoplay?.stop();
          }}
          onSlideChange={(swiper) => setActive(swiper.realIndex)}
        >
          {groups.map((group) => (
            <SwiperSlide key={group.map((slide) => slide.src).join("|")}>
              <GroupView group={group} />
            </SwiperSlide>
          ))}
        </Swiper>
        ) : (
          <div className="slideshow__swiper">
            {groups[0] && <GroupView group={groups[0]} />}
          </div>
        )}

      </div>

      {showControls && (
        <div className="slideshow__arrows">
          <button
            type="button"
            className="slideshow__arrow"
            aria-label="Previous project"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <Arrow dir="prev" />
          </button>
          <button
            type="button"
            className="slideshow__arrow"
            aria-label="Next project"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <Arrow dir="next" />
          </button>
        </div>
      )}
    </div>
  );
}
