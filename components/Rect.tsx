import { rectToPath } from "@/utils/pointsToSVG";

type RectProps = {
  width: number;
  height: number;
  x: number;
  y: number;
  precision?: number;
};

export default function Rect({ width, height, x, y, precision }: RectProps) {
  return <path d={rectToPath(width, height, x, y, precision)}></path>;
}
