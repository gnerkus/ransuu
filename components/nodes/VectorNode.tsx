import { BaseNode } from "@/types/nodes";
import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import CustomNodeWrapper from "../CustomNodeWrapper";
import { useNodeData } from "@/store/nodeDataStore";
import { NodeTextInput } from "../NodeTextInput";

function VectorNode({ id }: BaseNode) {
  const { nodeValue, handleNodeInput } = useNodeData(id);

  return (
    <CustomNodeWrapper>
      <div className="bg-rose-700 px-2 py-1 text-gray-100 rounded-t-lg max-h-[40px]">
        Vector
      </div>
      <div className="relative">
        <div className="px-4 py-1 bg-gray-50 text-right max-h-[40px]">
          Vector
        </div>
        <Handle type="source" position={Position.Right} id={id} />
      </div>

      <div className="bg-gray-50 p-4 rounded-b-lg">
        <div className="bg-gray-200 text-gray-800 rounded-lg divide-y-2 divide-gray-300">
          {Object.keys(nodeValue.data).map((handleId) => (
            <NodeTextInput
              key={handleId}
              handleId={handleId}
              value={`${nodeValue.data[handleId as "x" | "y"]}`}
              onChange={handleNodeInput(
                handleId,
                `${nodeValue.handle}.${handleId}`
              )}
            />
          ))}
        </div>
      </div>
    </CustomNodeWrapper>
  );
}

export default memo(VectorNode);
