import { GroupInputNodeData } from "@/types/nodes";
import { memo } from "react";
import { Handle, Position } from "reactflow";
import CustomNodeWrapper from "../CustomNodeWrapper";

function GroupInputNode({ id }: GroupInputNodeData) {
  return (
    <CustomNodeWrapper>
      <div className="bg-gray-700 px-2 py-1 text-gray-100 rounded-t-lg max-h-[40px]">
        Group Input
      </div>
      <div className="px-4 py-1 bg-gray-100 text-right max-h-[40px] rounded-b-lg">
        Shape
      </div>
      <Handle type="source" position={Position.Right} id={id} />
    </CustomNodeWrapper>
  );
}

export default memo(GroupInputNode);
