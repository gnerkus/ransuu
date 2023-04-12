import { VectorNodeData } from "@/types/nodes";
import React, { ChangeEventHandler, memo } from "react";
import { Handle, useReactFlow, useStoreApi, Position } from "reactflow";
import CustomNodeWrapper from "../CustomNodeWrapper";

type NodeTextInputProps = {
  value: string;
  handleId: string;
  nodeId: string;
};

function NodeTextInput({ value, handleId, nodeId }: NodeTextInputProps) {
  const { setNodes } = useReactFlow();
  const store = useStoreApi();

  const onChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    const { nodeInternals } = store.getState();
    setNodes(
      Array.from(nodeInternals.values()).map((node) => {
        if (node.id === nodeId) {
          node.data = {
            ...node.data,
            [handleId]: evt.target.value,
          };
        }

        return node;
      })
    );
  };

  return (
    <div className="flex gap-2 hover:bg-gray-300">
      <p className="pl-4 py-1">{handleId.toUpperCase()}</p>
      <input
        onChange={onChange}
        value={value}
        className="appearance-none text-end pr-4 max-w-[128px] bg-transparent"
      />
    </div>
  );
}

function VectorNode({ id, data }: VectorNodeData) {
  return (
    <CustomNodeWrapper>
      <div className="bg-rose-700 px-2 py-1 text-gray-100 rounded-t-lg max-h-[40px]">
        Vector Node
      </div>
      <div className="px-4 py-1 bg-gray-100 text-right max-h-[40px]">
        Vector
      </div>
      <Handle type="source" position={Position.Right} id={id} />
      <div className="bg-gray-100 p-4 rounded-b-lg">
        <div className="bg-gray-200 text-gray-800 rounded-lg divide-y-2 divide-gray-300">
          {Object.keys(data).map((handleId) => (
            <NodeTextInput
              key={handleId}
              nodeId={id}
              value={data[handleId]}
              handleId={handleId}
            />
          ))}
        </div>
      </div>
    </CustomNodeWrapper>
  );
}

export default memo(VectorNode);
