import { PathData } from "@/types/path";
import { pointsToPath } from "@/utils/pointsToSVG";

type PathProps = {
  path: PathData;
};

export default function Path({ path }: PathProps) {
  return (
    <path
      d={pointsToPath(path.points)}
      fill={path.attributes.fill}
      stroke={path.attributes.stroke}
    ></path>
  );
}
