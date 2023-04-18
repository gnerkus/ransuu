import { BaseNode } from "@/types/nodes";
import { Handle, Position } from "reactflow";
import CustomNodeWrapper from "../CustomNodeWrapper";
import { memo } from "react";
import { useNodeData } from "@/store/nodeDataStore";
import { NodeTextInput } from "../NodeTextInput";

function TransformNode({ id }: BaseNode) {
  const { nodeValue, handleNodeInput } = useNodeData(id);

  // TODO: compute path and update output node

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
        <div className="bg-gray-50 p-4 rounded-b-lg">
          <div className="bg-gray-200 text-gray-800 rounded-lg divide-y-2 divide-gray-300">
            {Object.keys(nodeValue.data.translate).map((handleId) => (
              <NodeTextInput
                key={handleId}
                handleId={handleId}
                value={`${nodeValue.data["translate"][handleId as "x" | "y"]}`}
                onChange={handleNodeInput(
                  `translate.${handleId}`,
                  nodeValue.data.handle
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Rotate */}
      <div className="relative">
        <div className="px-4 py-1 bg-gray-50 text-left max-h-[40px]">
          Rotation:
        </div>
        <Handle type="target" position={Position.Left} id="rotate" />
        <div className="bg-gray-50 p-4 rounded-b-lg">
          <div className="bg-gray-200 text-gray-800 rounded-lg divide-y-2 divide-gray-300">
            {Object.keys(nodeValue.data.rotate).map((handleId) => (
              <NodeTextInput
                key={handleId}
                handleId={handleId}
                value={`${
                  nodeValue.data["rotate"][
                    handleId as "angele" | "centerX" | "centerY"
                  ]
                }`}
                onChange={handleNodeInput(
                  `rotate.${handleId}`,
                  nodeValue.data.handle
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scale */}
      <div className="relative">
        <div className="px-4 py-1 bg-gray-50 text-left max-h-[40px]">
          Scale:
        </div>
        <Handle type="target" position={Position.Left} id="scale" />
        <div className="bg-gray-50 p-4 rounded-b-lg">
          <div className="bg-gray-200 text-gray-800 rounded-lg divide-y-2 divide-gray-300">
            {Object.keys(nodeValue.data.scale).map((handleId) => (
              <NodeTextInput
                key={handleId}
                handleId={handleId}
                value={`${nodeValue.data["scale"][handleId as "x" | "y"]}`}
                onChange={handleNodeInput(
                  `scale.${handleId}`,
                  nodeValue.data.handle
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Skew */}
      <div className="relative">
        <div className="px-4 py-1 bg-gray-50 text-left max-h-[40px]">Skew:</div>
        <Handle type="target" position={Position.Left} id="skew" />
        <div className="bg-gray-50 p-4 rounded-b-lg">
          <div className="bg-gray-200 text-gray-800 rounded-lg divide-y-2 divide-gray-300">
            {Object.keys(nodeValue.data.skew).map((handleId) => (
              <NodeTextInput
                key={handleId}
                handleId={handleId}
                value={`${nodeValue.data["skew"][handleId as "x" | "y"]}`}
                onChange={handleNodeInput(
                  `skew.${handleId}`,
                  nodeValue.data.handle
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </CustomNodeWrapper>
  );
}

export default memo(TransformNode);
