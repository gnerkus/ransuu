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
import { FlowState, useStore } from "@/store/nodeDisplayStore";
import {
  NodeDataState,
  useStore as useNodeDataStore,
} from "@/store/nodeDataStore";

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

const dataSelector = (store: NodeDataState) => ({
  output: store.nodes["output"],
  addDataEdge: store.actions.addEdge,
});

type CustomAddEgde = (
  callback: (connection: Connection) => void
) => (data: Connection) => void;

export default function SVGNodeEditor() {
  const store = useStore(selector, shallow);
  const { output, addDataEdge } = useNodeDataStore(dataSelector, shallow);

  const customAddEgde: CustomAddEgde =
    (callback) => (connection: Connection) => {
      callback(connection);
      store.addEdge(connection);
    };

  return (
    <ReactFlowProvider>
      <div style={{ width: "100vw", height: "100vh" }}>
        <ReactFlow
          nodes={store.nodes}
          edges={store.edges}
          onNodesChange={store.onNodesChange}
          onEdgesChange={store.onEdgesChange}
          onConnect={customAddEgde(addDataEdge)}
          nodeTypes={nodeTypes}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background variant={"dots" as BackgroundVariant} gap={12} size={1} />
        </ReactFlow>
      </div>
      <SVGOutput width={512} height={512} svgOutput={output} />
    </ReactFlowProvider>
  );
}
