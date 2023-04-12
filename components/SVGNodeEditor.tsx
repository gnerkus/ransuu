import { useNodesState } from "reactflow";
import BasicFlow from "./BasicFlow";
import Group from "./Group";
import Path from "./Path";
import SVGOutput from "./SVGOutput";
import { BaseNodeData } from "@/types/nodes";

import "reactflow/dist/style.css";
import { nodes as initialNodes, nodeTypes } from "./initialNodes";

export default function SVGNodeEditor() {
  const [nodes, setNodes, onNodesChange] =
    useNodesState<BaseNodeData>(initialNodes);

  const outputNode = nodes.filter((node) => node.id === "output")[0];

  const path = outputNode
    ? outputNode.data.path
    : {
        points: [
          { x: 32, y: 32 },
          { x: 128, y: 32 },
          { x: 128, y: 128 },
          { x: 32, y: 128 },
        ],
        attributes: { fill: "#ff0000", stroke: "##ffffff" },
      };

  return (
    <>
      <BasicFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
      />
      <SVGOutput width={512} height={512}>
        <Group>
          <Path path={path} />
        </Group>
      </SVGOutput>
    </>
  );
}
