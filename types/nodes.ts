import VectorNode from "@/components/nodes/VectorNode";
import { PathData, Point } from "./path";
import { XYPosition } from "reactflow";
import GroupInputNode from "@/components/nodes/GroupInputNode";
import GroupOutputNode from "@/components/nodes/GroupOutputNode";

export const nodeTypes = {
  svg_vectorNode: VectorNode,
  svg_groupInputNode: GroupInputNode,
  svg_groupOutputNode: GroupOutputNode,
};

export type BaseNodeData = Point | PathData;
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

export type GroupInputNode = BaseNode & { data: PathData };

export type GroupOutputNode = GroupInputNode;

export type NodeInputData = Point;

export type NodeOutputData = Point;

export type VectorNode = BaseNode & { data: Point };
