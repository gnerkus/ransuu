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
    <div className="flex gap-2">
      <p>{handleId}</p>
      <input onChange={onChange} value={value} />
      <Handle type="source" position={Position.Right} id={handleId} />
    </div>
  );
}

function VectorNode({ id, data }: VectorNodeData) {
  return (
    <>
      <div className="bg-red-700 p-2 text-gray-100">Vector Node</div>
      <div className="bg-gray-700 p-2">
        {Object.keys(data).map((handleId) => (
          <NodeTextInput
            key={handleId}
            nodeId={id}
            value={data[handleId]}
            handleId={handleId}
          />
        ))}
      </div>
    </>
  );
}

export default memo(VectorNode);
