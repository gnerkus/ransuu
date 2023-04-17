import VectorNode from "@/components/nodes/VectorNode";
import { PathData, Point, Transform } from "./path";
import { XYPosition } from "reactflow";
import GroupInputNode from "@/components/nodes/GroupInputNode";
import GroupOutputNode from "@/components/nodes/GroupOutputNode";

export const nodeTypes = {
  svg_vectorNode: VectorNode,
  svg_groupInputNode: GroupInputNode,
  svg_groupOutputNode: GroupOutputNode,
};

export type BaseNodeOperation = (
  path: PathData,
  handle: string,
  data: any
) => PathData;

export type BaseNodeData = {
  inputs: string[];
  outputs: string[];
  handle?: string; // name of the field on the target node to which this node is attached
  path?: PathData;
  operation?: BaseNodeOperation;
  data?: Point;
};

export type BaseNodeUpdateData = Record<string, string>;

export type BaseNode = {
  id: string;
  type?: string;
  position: XYPosition;
  data: BaseNodeData;
};

export type BaseEdgeData = {
  source: string;
  target: string;
  sourceHandle?: string | null;
  targetHandle?: string | null;
};

export type BaseEdge = BaseEdgeData & {
  id: string;
};

export type GroupInputNode = BaseNode & {
  data: BaseNodeData & { path: PathData };
};

export type GroupOutputNode = GroupInputNode;

export type NodeInputData = Point;

export type NodeOutputData = Point;

export type VectorNode = BaseNode & { data: BaseNodeData & { data: Point } };

export type TransformNode = BaseNode & {
  data: BaseNodeData & { path: PathData; data: Transform };
};
