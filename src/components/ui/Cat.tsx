import Image from "next/image";
function Eye({
  cx,
  cy,
  rx,
  ry,
}: {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
}) {
  return (
    <g>
      <ellipse
        cx={cx}
        cy={cy}
        rx={rx}
        ry={ry}
        fill="var(--offwhite)"
      />
      <g
        className="cat__pupil"
        style={{
          "--look": `${ry * 0.4}px`,
        } as React.CSSProperties}
      >
        <ellipse
          cx={cx}
          cy={cy}
          rx={rx * 0.58}
          ry={ry * 0.78}
          fill="var(--lime)"
        />
        <ellipse
          cx={cx}
          cy={cy}
          rx={rx * 0.38}
          ry={ry * 0.41}
          fill="var(--ink)"
        />
      </g>
    </g>
  );
}

type EyeSpec = {
  x: number;
  y: number;
  w: number;
  ratio?: number;
};

type MouthSpec = {
  x: number;
  y: number;
  w: number;
};
export const CAT_FACE: { eyes: EyeSpec[]; mouth: MouthSpec } = {
  eyes: [
    { x: 24.5, y: 9, w: 5, ratio: 1.7 },
    { x: 38, y: 9, w: 5, ratio: 1.7 },
  ],
  mouth: { x: 31.3, y: 14.9, w: 14 },
};

export default function CatArt({
  src,
  eyes,
  mouth,
  className,
}: {
  src: string;
  eyes?: EyeSpec[];
  mouth?: MouthSpec;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="cat-art">
        <Image
          src={src}
          alt=""
          width={1000}
          height={600}
          unoptimized
        />

        {mouth && (
          <svg
            className="cat-art__mouth"
            viewBox="0 0 181 56"
            style={{
              left: `${mouth.x}%`,
              top: `${mouth.y}%`,
              width: `${mouth.w}%`,
            }}
            aria-hidden="true"
          >
            <rect
              className="cat-art__patch"
              x="-14"
              y="-24"
              width="209"
              height="100"
              rx="30"
            />

            <polygon
              points="60,0 121,0 90.5,21"
              fill="var(--lime)"
            />

            <path
              className="cat-art__smile"
              d="M0 21 Q45 70 90.5 21 M181 21 Q136 70 90.5 21"
              stroke="var(--lime)"
              strokeWidth="1.5"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        )}

        {eyes?.map((e, i) => (
          <span
            key={i}
            className="cat-art__eye"
            style={{
              left: `${e.x}%`,
              top: `${e.y}%`,
              width: `${e.w}%`,
              aspectRatio: `${e.ratio ?? 1.9}`,
            }}
          >
            <span className="cat-art__ball">
              <span className="cat-art__pupil" />
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function CatDrawn({
  className,
  dollars,
}: {
  className?: string;
  dollars?: boolean;
}) {
  return (
    <svg
      className={`cat ${className ?? ""}`}
      viewBox="0 0 250 300"
      aria-hidden="true"
    >
      <path
        fill="var(--cat-body)"
        d="M62 62 L66 30 L92 48 Q120 40 148 48 L174 30 L178 62 Q184 90 172 112
           Q178 118 180 150 Q178 215 200 240 Q222 250 226 270 Q232 296 210 296
           L52 296 Q40 296 40 285 L52 230 Q40 150 70 110 Q56 90 62 62 Z"
      />

      <Eye cx={96} cy={78} rx={11} ry={8} />
      <Eye cx={144} cy={78} rx={11} ry={8} />

      <polygon
        points="114,92 126,92 120,99"
        fill="var(--lime)"
      />

      <path
        d="M120 99 Q112 108 102 104 M120 99 Q128 108 138 104"
        stroke="var(--olive)"
        strokeWidth="1"
        fill="none"
      />

      {dollars && (
        <g
          fill="var(--olive)"
          fontFamily="var(--ff-head)"
          fontWeight="700"
          fontSize="26"
        >
          <text x="0" y="200">+$</text>
          <text x="192" y="112">+$</text>
        </g>
      )}
    </svg>
  );
}

export function CatHead({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      className={`cat cat--head ${className ?? ""}`}
      viewBox="0 0 184 90"
      aria-hidden="true"
    >
      <path
        fill="var(--charcoal)"
        d="M0 0 H184 V70 L162 90 L146 68 H38 L22 90 L0 70 Z"
      />

      <path
        className="cat__brows"
        d="M49 16 Q70 -4 92 18 M135 16 Q114 -4 92 18"
        stroke="var(--lime)"
        strokeWidth="1"
        fill="none"
      />

      <polygon
        points="79,26 105,26 92,15"
        fill="var(--lime)"
      />

      <Eye cx={51} cy={49} rx={16} ry={8.5} />
      <Eye cx={133} cy={49} rx={16} ry={8.5} />
    </svg>
  );
}
