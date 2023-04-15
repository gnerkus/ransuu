import { addEdge, useEdgesState, useNodesState } from "reactflow";
import BasicFlow from "./BasicFlow";
import SVGOutput from "./SVGOutput";
import { BaseNodeData } from "@/types/nodes";

import "reactflow/dist/style.css";
import {
  nodes as initialNodes,
  nodeTypes,
  edges as initialEdges,
} from "./initialNodes";
import { useCallback } from "react";

export default function SVGNodeEditor() {
  const [nodes, setNodes, onNodesChange] =
    useNodesState<BaseNodeData>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const outputNode = nodes.filter((node) => node.id === "output")[0];

  return (
    <>
      <BasicFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      />
      <SVGOutput width={512} height={512} svgOutput={outputNode.data} />
    </>
  );
}
