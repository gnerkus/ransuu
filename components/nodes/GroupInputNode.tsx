import { GroupInputNodeData } from "@/types/nodes";
import { memo } from "react";
import { Handle, Position } from "reactflow";

function GroupInputNode({ id, data }: GroupInputNodeData) {
  return (
    <div className="svgGenNode min-w-[200px]">
      <div className="bg-gray-700 px-2 py-1 text-gray-100 rounded-t-lg max-h-[40px]">
        Group Input
      </div>
      <div className="px-4 py-1 bg-gray-100 text-right max-h-[40px] rounded-b-lg">
        Shape
      </div>
      <Handle type="source" position={Position.Right} id={id} />
    </div>
  );
}

export default memo(GroupInputNode);
