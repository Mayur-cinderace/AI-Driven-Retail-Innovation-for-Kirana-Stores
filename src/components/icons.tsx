import type { SVGProps } from "react";

export function LeafIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 20A7 7 0 0 1 4 13V8a2 2 0 0 1 2-2h4l3 3h4a2 2 0 0 1 2 2v4a7 7 0 0 1-7 7Z" />
      <path d="M11 20v-9" />
    </svg>
  );
}
