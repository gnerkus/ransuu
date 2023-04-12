import { PathData, Point } from "./path";

export type GroupInputNodeData = {
  id: string;
  type: "custom";
  position: Point;
  data: {
    path: PathData;
  };
};

export type GroupOutputNodeData = GroupInputNodeData;

export type VectorNodeData = {
  id: string;
  type: "custom";
  position: Point;
  data: Point;
};
