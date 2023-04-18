import { BaseNodeData } from "@/types/nodes";
import Group from "./Group";
import Path from "./Path";
import { PathData } from "@/types/path";

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
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height}>
      <Group>
        <Path path={svgOutput.path as PathData} />
      </Group>
    </svg>
  );
}
