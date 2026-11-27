export type Slide = {
  src: string;
  alt: string;
  fit?: "cover" | "contain";
  with?: { src: string; alt: string }[]; 
};


export const works: Slide[] = [
  { src: "/portfolio/africa.png", alt: "Africa — travel landing page" },
  { src: "/portfolio/work-2.png", alt: "Game promo — landing page" },
  { src: "/portfolio/work-3.png", alt: "Landing page with illustration" },
  { src: "/portfolio/work-4.png", alt: "Service page with a form" },
  { src: "/portfolio/work-5.png", alt: "Landing page with a form" },


  {
    src: "/portfolio/app-1.png",
    alt: "Mobile app screen",
    with: [{ src: "/portfolio/app-2.png", alt: "Mobile app screen" }],
  },

  {
    src: "/portfolio/app-3.png",
    alt: "Mobile app screen",
    with: [{ src: "/portfolio/app-4.png", alt: "Mobile app screen" }],
  },

  {
    src: "/portfolio/app-5.png",
    alt: "Mobile app screen",
    with: [
      { src: "/portfolio/app-6.png", alt: "Mobile app screen" },
      { src: "/portfolio/app-7.png", alt: "Mobile app screen" },
    ],
  },
];

export const caseStudy = {
  title: "More than just a sports bar",
  text: "A fresh digital look for YOURS Sports Bar. The redesign brings the energy of live sports, great company and unforgettable game nights into a bold, modern web experience",
  before: [
    { src: "/portfolio/before-1.png", alt: "Before redesign — menu page" },
    { src: "/portfolio/before-2.png", alt: "Before redesign — events page" },
  ] as Slide[],
  after: [
    { src: "/portfolio/after-1.png", alt: "After redesign — home page" },
    { src: "/portfolio/after-2.png", alt: "After redesign — Eat Hard. Cheer Harder." },
    { src: "/portfolio/after-3.png", alt: "After redesign — events calendar" },
    { src: "/portfolio/after-4.png", alt: "After redesign — Max Power Specials" },
    { src: "/portfolio/after-5.png", alt: "After redesign — premium drinks" },
    { src: "/portfolio/after-6.png", alt: "After redesign — location and opening hours" },
  ] as Slide[],
  points: [
    { n: "01", title: "A sharper message", text: "One clear promise replaces generic introductions." },
    { n: "02", title: "A better hierarchy", text: "The eye moves from the video to the next action." },
    { n: "03", title: "A focused next step", text: "One primary CTA makes the journey easier." },
  ],
  note: "Illustrative redesign study — strategy and design rationale, not measured performance results.",
};