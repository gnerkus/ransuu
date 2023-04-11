import React, { useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
} from "reactflow";

import "reactflow/dist/style.css";

const nodeTypes = {
  custom: VectorNode,
};

import { nodes as initialNodes } from "./initialNodes";
import VectorNode from "./nodes/VectorNode";

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  //   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  //   const onConnect = useCallback(
  //     (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
  //     [setEdges]
  //   );

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
