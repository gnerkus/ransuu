import { PathData, Point, Rotation, TransformData } from "@/types/path";
import { pointsToPath } from "@/utils/pointsToSVG";

const serializeVector = (handle: string, vector: Point): string => {
  return `${handle}(${vector.x} ${vector.y})`;
};

const serializeRotation = (handle: string, rotation: Rotation): string => {
  return `${handle}(${rotation.angle} ${rotation.centerX} ${rotation.centerY})`;
};

const serializeTransform = (attrs?: TransformData): string => {
  if (!attrs) return "";

  return [
    serializeVector("translate", attrs.translate || { x: 0, y: 0 }),
    serializeRotation(
      "rotate",
      attrs.rotate || { centerX: 0, centerY: 0, angle: 0 }
    ),
    serializeVector("scale", attrs.scale || { x: 0, y: 0 }),
    attrs.skew ? `skewX(${attrs.skew.x})` : "",
    attrs.skew ? `skewY(${attrs.skew.y})` : "",
  ].join(" ");
};

const serializePathAttributes = (path: PathData): Record<string, string> => {
  const serializedAttrs: Record<string, string> = {
    fill: path.attributes.fill,
    stroke: path.attributes.stroke,
  };

  const serializedTransform = serializeTransform(path.attributes.transform);

  if (serializedTransform) {
    serializedAttrs.transform = serializedTransform;
  }

  return serializedAttrs;
};

type PathProps = {
  path: PathData;
};

export default function Path({ path }: PathProps) {
  return (
    <path
      d={pointsToPath(path.points)}
      {...serializePathAttributes(path)}
    ></path>
  );
}
