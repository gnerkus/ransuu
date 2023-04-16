import React from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  Node,
  NodeChange,
  Edge,
  EdgeChange,
  BackgroundVariant,
} from "reactflow";

import "reactflow/dist/style.css";
import { BaseEdge, BaseNodeData } from "@/types/nodes";

type OnChange<ChangesType> = (changes: ChangesType[]) => void;

type BasicFlowProps = {
  nodes: Node<BaseNodeData, string | undefined>[];
  edges: Edge<BaseEdge>[];
  onNodesChange: OnChange<NodeChange>;
  onEdgesChange: OnChange<EdgeChange>;
  onConnect: any;
  nodeTypes: any;
};

export default function BasicFlow({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  nodeTypes,
}: BasicFlowProps) {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      >
        <Controls />
        <MiniMap />
        <Background variant={"dots" as BackgroundVariant} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
