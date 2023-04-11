import { Point } from "./path";

export type VectorNodeData = {
  id: string;
  type: "custom";
  position: Point;
  data: Point;
};
