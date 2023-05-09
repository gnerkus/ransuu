import { BaseNode } from "@/types/nodes";
import { memo } from "react";
import { Handle, Position } from "reactflow";
import CustomNodeWrapper from "../CustomNodeWrapper";

function GroupInputNode({ id }: BaseNode) {
  return (
    <CustomNodeWrapper>
      <div className="bg-gray-700 px-2 py-1 text-gray-100 rounded-t-lg max-h-[40px]">
        Group Input
      </div>
      <div className="relative">
        <div className="px-4 py-1 bg-gray-100 text-right max-h-[40px] rounded-b-lg">
          Path
        </div>
        <Handle type="source" position={Position.Right} id={id} />
      </div>
    </CustomNodeWrapper>
  );
}

export default memo(GroupInputNode);
