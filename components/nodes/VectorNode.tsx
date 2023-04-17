import { VectorNode } from "@/types/nodes";
import React, { ChangeEvent, memo } from "react";
import { Handle, Position } from "reactflow";
import CustomNodeWrapper from "../CustomNodeWrapper";
import { shallow } from "zustand/shallow";
import { FlowState, useStore } from "@/store/store";

type NodeTextInputProps = {
  value: string;
  handleId: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const selector = (id: string) => (store: FlowState) => ({
  vectorValue: store.nodes.filter((node) => node.id === id)[0],
  setVector:
    (handleId: string, nodeHandle?: string) =>
    (e: ChangeEvent<HTMLInputElement>) =>
      store.updateNode(
        id,
        {
          [handleId]: e.target.value,
        },
        nodeHandle
      ),
});

function NodeTextInput({ value, handleId, onChange }: NodeTextInputProps) {
  return (
    <div className="flex gap-2 hover:bg-gray-300">
      <p className="pl-4 py-1">{handleId.toUpperCase()}</p>
      <input
        type="number"
        inputMode="numeric"
        pattern="\d"
        onChange={onChange}
        value={value}
        className="nodrag appearance-none text-end pr-4 max-w-[128px] bg-transparent"
      />
    </div>
  );
}

function VectorNode({ id, data }: VectorNode) {
  const { setVector, vectorValue } = useStore(selector(id), shallow);

  const value = vectorValue.data.data ? vectorValue.data.data : data.data;
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
          {Object.keys(data.data).map((handleId) => (
            <NodeTextInput
              key={handleId}
              handleId={handleId}
              value={`${value[handleId as "x" | "y"]}`}
              onChange={setVector(handleId, vectorValue.data.handle)}
            />
          ))}
        </div>
      </div>
    </CustomNodeWrapper>
  );
}

export default memo(VectorNode);
