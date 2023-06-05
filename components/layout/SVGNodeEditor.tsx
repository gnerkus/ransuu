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
import NodeMenu from "./NodeMenu";
import SVGMeta from "./SVGMeta";

const selector = (store: FlowState) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
  addEdge: store.addEdge,
});

export default function SVGNodeEditor() {
  const store = useStore(selector, shallow);

  return (
    <div className="relative bg-gray-100 w-full h-full">
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
    </ReactFlowProvider>
      <div className="absolute bottom-0 lg:top-0 right-0 flex flex-col md:flex-row lg:flex-col z-10 gap-4 justify-between p-4 w-full lg:w-1/3 h-1/3 lg:h-full">
        <SVGOutput width={512} height={512} />
        <SVGMeta />
      </div>

      <NodeMenu />
    </div>
  )
}
