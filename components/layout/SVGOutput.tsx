import { useGraphOutput } from "@/store/store";
import * as svg from "@thi.ng/hiccup-svg";

type SVGOutputProps = {
  width: number;
  height: number;
};

export default function SVGOutput({width, height}: SVGOutputProps) {
  const output = useGraphOutput();

  const parsedResult = svg.convertTree(output);

  if (!parsedResult) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-md shadow-gray-200 w-full md:w-1/2 lg:w-full h-full lg:h-1/3">
      <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 512 512"
    >
      <path {...parsedResult[1]} />        
    </svg>
    </div>
  );
}
