import { PathData, Point } from "./path";

export type BaseNodeData = {
  id: string;
  type: string;
  position: Point;
  data: any;
};

export type BaseEdgeData = {
  id: string;
  source: string;
  target: string;
};

export type GroupInputNodeData = BaseNodeData & {
  data: {
    path: PathData;
  };
};

export type GroupOutputNodeData = GroupInputNodeData;

export type VectorNodeData = BaseNodeData & {
  data: Point;
};
