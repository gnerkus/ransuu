import VectorNode from "@/components/nodes/VectorNode";
import { Edge } from "reactflow";
import { PathData, Point, Rotation } from "./path";
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

export type BaseNodeOperation = (path: PathData, data: any) => PathData;

export type HandleOutputPair = {
  handle: string;
  id: string;
};

export type BaseNodeData = {
  outputs: Set<HandleOutputPair>;
  path?: PathData;
  data?: any;
};

export type BaseNodeUpdateData = Record<string, string>;

type BaseNodeDataType = {
  [key: string]: PathData | Point | Rotation | undefined;
};

export type BaseNode = {
  id: string;
  type?: string;
  position: XYPosition;
  data: BaseNodeDataType;
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
