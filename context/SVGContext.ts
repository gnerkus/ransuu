import { Node } from "reactflow";
import { BaseNodeData } from "@/types/nodes";
import { PathData } from "@/types/path";

function generateSVGOutput(
  nodes: Node<BaseNodeData, string | undefined>[],
  start: Node<BaseNodeData, string | undefined>
): PathData[] {
  // placeholder return
  return [
    {
      points: [
        { x: 32, y: 32 },
        { x: 128, y: 32 },
        { x: 128, y: 128 },
        { x: 32, y: 128 },
      ],
      attributes: { fill: "#ff0000", stroke: "##ffffff" },
    },
  ];
}
