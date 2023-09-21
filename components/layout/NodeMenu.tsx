import { useHandleAddNode } from "@/store/store";
import { UINodeType } from "@/types/nodes";

export default function NodeMenu() {
  const handleAddNode = useHandleAddNode();
  return (
    <div className="absolute w-12 h-2/3 lg:h-full top-0 left-4 flex flex-col z-10 justify-center">
      <div className="bg-white h-48 rounded-lg shadow-md shadow-gray-200">
        <button onClick={() => handleAddNode(UINodeType.svg_vectorNode)}>
          Vector
        </button>
      </div>
    </div>
  );
}
