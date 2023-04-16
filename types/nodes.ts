import { PathData, Point } from "./path";

type NodeOperation = (input: NodeInputData) => NodeOutputData;

export type BaseNodeData = {
  id: string;
  type: string;
  position: Point;
  isSelected: boolean;
  inputs: string[];
  outputs: string[];
  operation: NodeOperation | null;
  data: any;
};

export type BaseEdgeData = {
  id: string;
  source: string;
  target: string;
};

export type GroupInputNodeData = BaseNodeData & {
  data: PathData;
};

export type GroupOutputNodeData = GroupInputNodeData;

export type NodeInputData = {
  data: Point; // TODO: add other types of input data
};

export type NodeOutputData = {
  data: Point;
};

export type VectorNodeData = BaseNodeData & { data: Point };
