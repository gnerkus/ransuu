import { BaseNode } from "@/types/nodes";
import { Handle, Position } from "reactflow";
import CustomNodeWrapper from "../CustomNodeWrapper";
import { memo } from "react";
import { useNodeData } from "@/store/nodeDataStore";

function TransformNode({ id }: BaseNode) {
  const { nodeValue, handleNodeInput } = useNodeData(id);
  return (
    <CustomNodeWrapper>
      <div className="bg-emerald-600 px-2 py-1 text-gray-100 rounded-t-lg max-h-[40px]">
        Transform Path
      </div>
      <div className="px-4 py-1 bg-gray-50 text-right max-h-[40px]">Path</div>
      <Handle
        type="source"
        position={Position.Right}
        id={id}
        style={{ backgroundColor: "rgb(5 150 105)" }}
      />
      <div className="px-4 py-1 bg-gray-50 text-left max-h-[40px]">Path</div>
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}_path`}
        style={{ backgroundColor: "rgb(5 150 105)" }}
      />
      {/* <div className="bg-gray-100 p-4 rounded-b-lg">
        <div className="bg-gray-200 text-gray-800 rounded-lg divide-y-2 divide-gray-300">
          {Object.keys(vectorValue.data).map((handleId) => (
            <NodeTextInput
              key={handleId}
              handleId={handleId}
              value={`${vectorValue.data[handleId as "x" | "y"]}`}
              onChange={setVector(handleId, vectorValue.data.handle)}
            />
          ))}
        </div>
      </div> */}
    </CustomNodeWrapper>
  );
}

export default memo(TransformNode);
