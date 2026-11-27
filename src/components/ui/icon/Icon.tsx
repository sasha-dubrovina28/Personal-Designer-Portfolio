import type { SVGProps } from "react";

export default function Icon({
  name,
  ...props
}: { name: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" focusable="false" {...props}>
      <use href={`/icons/sprite.svg#${name}`} />
    </svg>
  );
}