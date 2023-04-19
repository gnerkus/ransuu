import { PathData, TransformData } from "@/types/path";
type SVGPathAttributes = {
  fill?: string;
  stroke?: string;
  transform?: string;
};
const serializeTransform = (transform: TransformData): string => {
  return Object.entries(transform)
    .map(([transformAttr, transformVal]) => {
      return `${transformAttr}(${transformVal.join(" ")})`;
    })
    .join(" ");
};

export const serializePathAttributes = (path: PathData): SVGPathAttributes => {
  const attr = {
    transform:
      path.attributes.transform &&
      serializeTransform(path.attributes.transform),
  };

  return {
    ...path.attributes,
    ...attr,
  };
};
