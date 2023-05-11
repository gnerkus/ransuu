import { useGraphOutput } from "@/store/store";
import Group from "./Group";
import Path from "./Path";
import { nanoid } from "nanoid";

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
    >
      <Group>
        {output.map((pathData) => (
          <Path key={nanoid(6)} path={pathData} />
        ))}
      </Group>
    </svg>
  );
}
