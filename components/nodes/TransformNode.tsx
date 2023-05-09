import { BaseNode } from "@/types/nodes";
import { Handle, Position } from "reactflow";
import CustomNodeWrapper from "../CustomNodeWrapper";
import { memo } from "react";
import { NodeTextInput } from "../NodeTextInput";
import { useHandleNodeInput } from "@/store/store";
import { Point, Rotation } from "@/types/path";

function TransformNode({ id, data, externalInputs }: BaseNode) {
  const handleNodeInput = useHandleNodeInput();

  const translateData = data.translate as Point;
  const rotateData = data.rotate as Rotation;
  const scaleData = data.scale as Point;
  const skewData = data.skew as Point;

  return (
    <CustomNodeWrapper>
      <div className="bg-emerald-600 px-2 py-1 text-gray-100 rounded-t-lg max-h-[40px]">
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
              {Object.keys(translateData).map((handleId) => (
                <NodeTextInput
                  key={handleId}
                  handleId={handleId}
                  value={`${translateData[handleId as "x" | "y"]}`}
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
              {Object.keys(rotateData).map((handleId) => (
                <NodeTextInput
                  key={handleId}
                  handleId={handleId}
                  value={`${
                    rotateData[handleId as "angle" | "centerX" | "centerY"]
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
              {Object.keys(scaleData).map((handleId) => (
                <NodeTextInput
                  key={handleId}
                  handleId={handleId}
                  value={`${scaleData[handleId as "x" | "y"]}`}
                  onChange={handleNodeInput(id, "scale", handleId)}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {/* Skew */}

      <div className="relative">
        <div className="px-4 py-1 bg-gray-50 text-left max-h-[40px]">Skew:</div>
        <Handle type="target" position={Position.Left} id="skew" />
        {!externalInputs?.skew ? (
          <div className="bg-gray-50 p-4 rounded-b-lg">
            <div className="bg-gray-200 text-gray-800 rounded-lg divide-y-2 divide-gray-300">
              {Object.keys(skewData).map((handleId) => (
                <NodeTextInput
                  key={handleId}
                  handleId={handleId}
                  value={`${skewData[handleId as "x" | "y"]}`}
                  onChange={handleNodeInput(id, "skew", handleId)}
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
