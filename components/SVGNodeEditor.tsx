import SVGOutput from "./SVGOutput";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  ReactFlowProvider,
} from "reactflow";

import { shallow } from "zustand/shallow";
import { FlowState, useStore } from "@/store/store";

import "reactflow/dist/style.css";
import { nodeTypes } from "@/types/nodes";

// we no longer read from ReactFlow's own store; we read from our own store
const selector = (store: FlowState) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
  addEdge: store.addEdge,
});

export default function SVGNodeEditor() {
  const store = useStore(selector, shallow);
  const outputNode = store.nodes.filter((node) => node.id === "output")[0];

  return (
    <ReactFlowProvider>
      <div style={{ width: "100vw", height: "100vh" }}>
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
      <SVGOutput width={512} height={512} svgOutput={outputNode.data} />
    </ReactFlowProvider>
  );
}
