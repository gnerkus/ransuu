import { useGraphOutput } from "@/store/nodeDisplayStore";

type SVGOutputProps = {
  width: number;
  height: number;
};

export default function SVGOutput({ width, height }: SVGOutputProps) {
  const output = useGraphOutput();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 512 512"
      dangerouslySetInnerHTML={{ __html: output }}
    ></svg>
  );
}
