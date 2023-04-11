import { ReactElement } from "react";

type SVGOutputProps = {
  width: number;
  height: number;
  children: ReactElement | ReactElement[];
};

export default function SVGOutput({ width, height, children }: SVGOutputProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height}>
      {children}
    </svg>
  );
}
