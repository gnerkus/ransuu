import { VectorNode } from "@/types/nodes";
import React, { ChangeEvent, memo } from "react";
import { Handle, Position } from "reactflow";
import CustomNodeWrapper from "../CustomNodeWrapper";
import { shallow } from "zustand/shallow";
import { FlowState, useStore } from "@/store/store";
import { Point } from "@/types/path";

type NodeTextInputProps = {
  value: string;
  handleId: string;
  nodeId: string;
};

const selector = (id: string) => (store: FlowState) => ({
  setVector: (handleId: string) => (e: ChangeEvent<HTMLInputElement>) =>
    store.handleInputUpdate(id, {
      [handleId]: e.target.value,
    }),
});

function NodeTextInput({ value, handleId, nodeId }: NodeTextInputProps) {
  const { setVector } = useStore(selector(nodeId), shallow);

  return (
    <div className="flex gap-2 hover:bg-gray-300">
      <p className="pl-4 py-1">{handleId.toUpperCase()}</p>
      <input
        type="number"
        inputMode="numeric"
        pattern="\d"
        onChange={setVector(handleId)}
        value={value}
        className="nodrag appearance-none text-end pr-4 max-w-[128px] bg-transparent"
      />
    </div>
  );
}

function VectorNode({ id, data }: VectorNode) {
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
              value={`${data[handleId as "x" | "y"]}`}
              handleId={handleId}
            />
          ))}
        </div>
      </div>
    </CustomNodeWrapper>
  );
}

export default memo(VectorNode);
