import VectorNode from "@/components/nodes/VectorNode";
import { Connection, Edge } from "reactflow";
import { PathData, Point, Transform } from "./path";
import { XYPosition } from "reactflow";
import GroupInputNode from "@/components/nodes/GroupInputNode";
import GroupOutputNode from "@/components/nodes/GroupOutputNode";
import TransformNode from "@/components/nodes/TransformNode";

export const nodeTypes = {
  svg_vectorNode: VectorNode,
  svg_transformNode: TransformNode,
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
  data?: any;
};

export type BaseNodeUpdateData = Record<string, string>;

export type BaseNode = {
  id: string;
  type?: string;
  position: XYPosition;
  data: any;
};

export type BaseEdgeData = {
  source: string;
  target: string;
  sourceHandle?: string | null;
  targetHandle?: string | null;
};

export type BaseEdge = Edge;

export type GroupInputNode = BaseNode & {
  data: BaseNodeData & { path: PathData };
};

export type GroupOutputNode = GroupInputNode;

export type NodeInputData = Point;

export type NodeOutputData = Point;
