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

type EdgeConnectParams = {
  source: string;
  sourceHandle: string;
  target: string;
  targetHandle: string;
};

export default function SVGNodeEditor() {
  const [nodes, setNodes, onNodesChange] =
    useNodesState<BaseNodeData>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params: EdgeConnectParams) =>
      setEdges((eds) => {
        return addEdge(params, eds);
      }),
    [setEdges]
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
