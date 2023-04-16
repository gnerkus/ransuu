import { PathData, Point } from "./path";

type NodeOperation = (input: NodeInputData) => NodeOutputData;

export type BaseNodeData = {
  isSelected: boolean;
  inputs: string[];
  outputs: string[];
  operation: NodeOperation | null;
  nodeData: any;
};

export type BaseNode = {
  id: string;
  type: string;
  position: Point;
  data: BaseNodeData;
};

export type BaseEdge = {
  id: string;
  source: string;
  target: string;
};

export type GroupInputNode = BaseNode & {
  data: BaseNodeData & { nodeData: PathData };
};

export type GroupOutputNode = GroupInputNode;

export type NodeInputData = Point;

export type NodeOutputData = Point;

export type VectorNode = BaseNode & {
  data: BaseNodeData & { nodeData: Point };
};
