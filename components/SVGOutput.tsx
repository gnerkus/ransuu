import { BaseNodeData } from "@/types/nodes";
import Group from "./Group";
import Path from "./Path";

type SVGOutputProps = {
  width: number;
  height: number;
  svgOutput: BaseNodeData;
};

export default function SVGOutput({
  width,
  height,
  svgOutput,
}: SVGOutputProps) {
  const path = svgOutput?.path || {
    points: [
      { x: 32, y: 32 },
      { x: 128, y: 32 },
      { x: 128, y: 128 },
      { x: 32, y: 128 },
    ],
    attributes: { fill: "#ff0000", stroke: "##ffffff" },
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height}>
      <Group>
        <Path path={path} />
      </Group>
    </svg>
  );
}
