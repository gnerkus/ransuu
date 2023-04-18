import { GroupOutputNode } from "@/types/nodes";
import { memo } from "react";
import { Handle, Position } from "reactflow";
import CustomNodeWrapper from "../CustomNodeWrapper";

function GroupOutputNode({ id }: GroupOutputNode) {
  return (
    <CustomNodeWrapper>
      <div className="bg-gray-700 px-2 py-1 text-gray-100 rounded-t-lg max-h-[40px]">
        Group Output
      </div>
      <div className="px-4 py-1 bg-gray-100 text-left max-h-[40px] rounded-b-lg">
        Shape
      </div>
      <Handle type="target" position={Position.Left} id={id} />
    </CustomNodeWrapper>
  );
}

export default memo(GroupOutputNode);
