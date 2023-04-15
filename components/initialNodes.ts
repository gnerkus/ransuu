import { BaseNodeData } from "@/types/nodes";
import { Point } from "@/types/path";
import VectorNode from "./nodes/VectorNode";
import GroupInputNode from "./nodes/GroupInputNode";
import GroupOutputNode from "./nodes/GroupOutputNode";

export const nodeTypes = {
  svg_vectorNode: VectorNode,
  svg_groupInputNode: GroupInputNode,
  svg_groupOutputNode: GroupOutputNode,
};

export const edges = [{ id: "e1-2", source: "input", target: "output" }];

export const nodes: BaseNodeData[] = [
  {
    id: "input",
    type: "svg_groupInputNode",
    position: {
      x: 100,
      y: 100,
    },
    data: {
      path: {
        points: [
          { x: 32, y: 32 },
          { x: 128, y: 32 },
          { x: 128, y: 128 },
          { x: 32, y: 128 },
        ] as Point[],
        attributes: {},
      },
    },
  },
  {
    id: "output",
    type: "svg_groupOutputNode",
    position: {
      x: 500,
      y: 100,
    },
    data: {
      path: {
        points: [
          { x: 32, y: 32 },
          { x: 128, y: 32 },
          { x: 128, y: 128 },
          { x: 32, y: 128 },
        ] as Point[],
        attributes: { fill: "#cc3399", stroke: "##ffffff" },
      },
    },
  },
  {
    id: "3",
    type: "svg_vectorNode",
    position: {
      x: 300,
      y: 200,
    },
    data: {
      x: 1,
      y: 1,
    },
  },
];
