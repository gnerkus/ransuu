import React from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  Node,
  NodeChange,
} from "reactflow";

import "reactflow/dist/style.css";
import { BaseNodeData } from "@/types/nodes";

type OnChange<ChangesType> = (changes: ChangesType[]) => void;

type BasicFlowProps = {
  nodes: Node<BaseNodeData, string | undefined>[];
  onNodesChange: OnChange<NodeChange>;
  nodeTypes: any;
};

export default function BasicFlow({
  nodes,
  onNodesChange,
  nodeTypes,
}: BasicFlowProps) {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        // edges={edges}
        onNodesChange={onNodesChange}
        // onEdgesChange={onEdgesChange}
        // onConnect={onConnect}
        nodeTypes={nodeTypes}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
