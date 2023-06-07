import { BaseNodeProps } from "@/types/nodes";
import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import CustomNodeWrapper from "../CustomNodeWrapper";
import { NodeTextInput } from "../NodeTextInput";
import { useHandleNodeInput } from "@/store/store";
import { Point } from "@/svggraph/types";

function VectorNode({ id, data }: BaseNodeProps) {
  const handleNodeInput = useHandleNodeInput();
  const nodeData = data.data as Point;

  return (
    <CustomNodeWrapper>
      <div className="bg-rose-700 px-2 py-1 text-gray-100 rounded-t-xl max-h-[40px]">
        Vector
      </div>
      <div className="relative">
        <div className="px-4 py-1 bg-gray-50 text-right max-h-[40px]">
          Vector
        </div>
        <Handle type="source" position={Position.Right} id={id} />
      </div>

      <div className="bg-gray-50 p-4 rounded-b-xl">
        <div className="bg-gray-200 text-gray-800 rounded-lg divide-y-2 divide-gray-300">
          {Object.keys(nodeData).map((handleId) => (
            <NodeTextInput
              key={handleId}
              handleId={handleId}
              value={`${nodeData[handleId as "x" | "y"]}`}
              onChange={handleNodeInput(id, "", handleId)}
            />
          ))}
        </div>
      </div>
    </CustomNodeWrapper>
  );
}

export default memo(VectorNode);
