import { BaseNodeData } from "@/types/nodes";
import Group from "./Group";
import Path from "./Path";

type SVGOutputProps = {
  width: number;
  height: number;
};

export default function SVGOutput({ width, height }: SVGOutputProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height}></svg>
  );
}
