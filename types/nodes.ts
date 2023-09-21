import VectorNode from "@/components/nodes/VectorNode";
import { Edge, NodeProps } from "reactflow";
import { XYPosition } from "reactflow";
import GroupInputNode from "@/components/nodes/GroupInputNode";
import GroupOutputNode from "@/components/nodes/GroupOutputNode";
import TransformNode from "@/components/nodes/TransformNode";
import { Point, TransformData } from "@/svggraph/types";

export enum UINodeType {
  svg_vectorNode,
  svg_transformNode,
  svg_groupInputNode,
  svg_groupOutputNode,
}

export const nodeTypes = {
  svg_vectorNode: VectorNode,
  svg_transformNode: TransformNode,
  svg_groupInputNode: GroupInputNode,
  svg_groupOutputNode: GroupOutputNode,
};

export type BaseNodeUpdateData = Record<string, string>;

export type BaseNodeDataType = Point | TransformData | {};

export type BaseNodeProps = NodeProps & {
  data: {
    externalInputs?: Record<string, boolean>;
    data: BaseNodeDataType;
  };
};

export type BaseNode = {
  id: string;
  type?: string;
  position: XYPosition;
  data: {
    externalInputs?: Record<string, boolean>;
    data: BaseNodeDataType;
  };
};

export type BaseEdgeData = {
  source: string;
  target: string;
  sourceHandle?: string | null;
  targetHandle?: string | null;
};

export type BaseEdge = Edge;

export type NodeInputData = Point;

export type NodeOutputData = Point;
