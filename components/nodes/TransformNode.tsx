import { BaseNodeProps } from "@/types/nodes";
import { Handle, Position } from "reactflow";
import CustomNodeWrapper from "../CustomNodeWrapper";
import { memo } from "react";
import { NodeTextInput } from "../NodeTextInput";
import { useHandleNodeInput } from "@/store/store";
import { TransformData } from "@/svggraph/types";

function TransformNode({ id, data }: BaseNodeProps) {
  const handleNodeInput = useHandleNodeInput();
  const nodeData = data.data as TransformData;
  const externalInputs = data.externalInputs;

  return (
    <CustomNodeWrapper>
      <div className="bg-emerald-600 px-2 py-1 text-gray-100 rounded-t-xl max-h-[40px]">
        Transform Path
      </div>

      <div className="relative">
        <div className="px-4 py-1 bg-gray-50 text-right max-h-[40px]">Path</div>
        <Handle
          type="source"
          position={Position.Right}
          id={id}
          style={{ backgroundColor: "rgb(16 185 129)" }}
        />
      </div>

      <div className="relative">
        <div className="px-4 py-1 bg-gray-50 text-left max-h-[40px]">Path</div>
        <Handle
          type="target"
          position={Position.Left}
          id="path"
          style={{ backgroundColor: "rgb(16 185 129)" }}
        />
      </div>

      {/* Translate */}

      <div className="relative">
        <div className="px-4 py-1 bg-gray-50 text-left max-h-[40px]">
          Translation:
        </div>
        <Handle type="target" position={Position.Left} id="translate" />
        {!externalInputs?.translate ? (
          <div className="bg-gray-50 p-4 rounded-b-lg">
            <div className="bg-gray-200 text-gray-800 rounded-lg divide-y-2 divide-gray-300">
              {Object.keys(nodeData.translate).map((handleId) => (
                <NodeTextInput
                  key={handleId}
                  handleId={handleId}
                  value={`${nodeData.translate[handleId as "x" | "y"]}`}
                  onChange={handleNodeInput(id, "translate", handleId)}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {/* Rotate */}

      <div className="relative">
        <div className="px-4 py-1 bg-gray-50 text-left max-h-[40px]">
          Rotation:
        </div>
        <Handle type="target" position={Position.Left} id="rotate" />
        {!externalInputs?.rotate ? (
          <div className="bg-gray-50 p-4 rounded-b-lg">
            <div className="bg-gray-200 text-gray-800 rounded-lg divide-y-2 divide-gray-300">
              {Object.keys(nodeData.rotate).map((handleId) => (
                <NodeTextInput
                  key={handleId}
                  handleId={handleId}
                  value={`${
                    nodeData.rotate[handleId as "value"]
                  }`}
                  onChange={handleNodeInput(id, "rotate", handleId)}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {/* Scale */}

      <div className="relative">
        <div className="px-4 py-1 bg-gray-50 text-left max-h-[40px]">
          Scale:
        </div>
        <Handle type="target" position={Position.Left} id="scale" />
        {!externalInputs?.scale ? (
          <div className="bg-gray-50 p-4 rounded-b-lg">
            <div className="bg-gray-200 text-gray-800 rounded-lg divide-y-2 divide-gray-300">
              {Object.keys(nodeData.scale).map((handleId) => (
                <NodeTextInput
                  key={handleId}
                  handleId={handleId}
                  value={`${nodeData.scale[handleId as "x" | "y"]}`}
                  onChange={handleNodeInput(id, "scale", handleId)}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {/* SkewX */}

      <div className="relative">
        <div className="px-4 py-1 bg-gray-50 text-left max-h-[40px]">Skew X:</div>
        <Handle type="target" position={Position.Left} id="skewX" />
        {!externalInputs?.skewX ? (
          <div className="bg-gray-50 p-4 rounded-b-lg">
            <div className="bg-gray-200 text-gray-800 rounded-lg divide-y-2 divide-gray-300">
              {Object.keys(nodeData.skewX).map((handleId) => (
                <NodeTextInput
                  key={handleId}
                  handleId={handleId}
                  value={`${nodeData.skewX[handleId as "value"]}`}
                  onChange={handleNodeInput(id, "skewX", handleId)}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {/* SkewY */}

      <div className="relative">
        <div className="px-4 py-1 bg-gray-50 text-left max-h-[40px]">Skew Y:</div>
        <Handle type="target" position={Position.Left} id="skewY" />
        {!externalInputs?.skewY ? (
          <div className="bg-gray-50 p-4 rounded-b-lg">
            <div className="bg-gray-200 text-gray-800 rounded-lg divide-y-2 divide-gray-300">
              {Object.keys(nodeData.skewY).map((handleId) => (
                <NodeTextInput
                  key={handleId}
                  handleId={handleId}
                  value={`${nodeData.skewY[handleId as "value"]}`}
                  onChange={handleNodeInput(id, "skewY", handleId)}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </CustomNodeWrapper>
  );
}

export default memo(TransformNode);
