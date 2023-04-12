import { BaseNodeData } from "@/types/nodes";
import { Point } from "@/types/path";

export const nodes: BaseNodeData[] = [
  {
    id: "1",
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
    id: "2",
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
        attributes: {},
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
