import SVGOutput from "./SVGOutput";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  ReactFlowProvider,
  Connection,
} from "reactflow";

import { shallow } from "zustand/shallow";
import { FlowState, createContextNodes, useStore } from "@/store/store";

import "reactflow/dist/style.css";
import { nodeTypes } from "@/types/nodes";
import { useRef, useEffect } from "react";

const selector = (store: FlowState) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
  addEdge: store.addEdge,
});

export default function SVGNodeEditor() {
  const store = useStore(selector, shallow);
  const loadRef = useRef(null);

  useEffect(() => {
    if (loadRef.current) {
      createContextNodes();
    }
  }, []);

  return (
    <ReactFlowProvider>
      <div style={{ width: "100vw", height: "100vh" }} ref={loadRef}>
        <ReactFlow
          nodes={store.nodes}
          edges={store.edges}
          onNodesChange={store.onNodesChange}
          onEdgesChange={store.onEdgesChange}
          onConnect={store.addEdge}
          nodeTypes={nodeTypes}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background variant={"dots" as BackgroundVariant} gap={12} size={1} />
        </ReactFlow>
      </div>
      <SVGOutput width={512} height={512} />
    </ReactFlowProvider>
  );
}
