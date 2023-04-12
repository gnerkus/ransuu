import { GroupOutputNodeData } from "@/types/nodes";
import { memo } from "react";
import { Handle, Position } from "reactflow";

function GroupOutputNode({ id, data }: GroupOutputNodeData) {
  return (
    <div className="svgGenNode min-w-[200px]">
      <div className="bg-gray-700 px-2 py-1 text-gray-100 rounded-t-lg max-h-[40px]">
        Group Output
      </div>
      <div className="px-4 py-1 bg-gray-100 text-left max-h-[40px] rounded-b-lg">
        Shape
      </div>
      <Handle type="source" position={Position.Left} id={id} />
    </div>
  );
}

export default memo(GroupOutputNode);
