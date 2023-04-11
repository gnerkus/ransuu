import { VectorNodeData } from "@/types/nodes";
import React, { ChangeEventHandler, memo } from "react";
import { Handle, useReactFlow, useStoreApi, Position } from "reactflow";

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
    <div className="flex gap-2 ">
      <p className="px-2 py-1">{handleId.toUpperCase()}</p>
      <input
        onChange={onChange}
        value={value}
        className="text-end px-2 max-w-[128px] bg-transparent focus:outline-none"
      />
      <Handle type="source" position={Position.Right} id={handleId} />
    </div>
  );
}

function VectorNode({ id, data }: VectorNodeData) {
  return (
    <div className="">
      <div className="bg-rose-700 px-2 py-1 text-gray-100 rounded-t-lg">
        Vector Node
      </div>
      <div className="bg-gray-100 p-4 rounded-b-lg">
        <div className="bg-gray-200 text-gray-800 rounded-lg">
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
    </div>
  );
}

export default memo(VectorNode);
