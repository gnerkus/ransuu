type TransformProperties = {
  translate?: {
    x: number;
    y: number;
  };
  rotate?: {
    deg: number;
    centerX: number;
    centerY: number;
  };
  scale?: {
    x: number;
    y: number;
  };
  skewX?: {
    deg: number;
  };
  skewY?: {
    deg: number;
  };
};

export function generateTransformAttribute({
  translate,
  rotate,
  scale,
  skewX,
  skewY,
}: TransformProperties): string {
  const translateAttr = translate
    ? `translate(${translate.x} ${translate.y})`
    : "";
  const scaleAttr = scale ? `scale(${scale.x} ${scale.y})` : "";
  const rotateAttr = rotate
    ? `rotate(${rotate.deg} ${rotate.centerX} ${rotate.centerY})`
    : "";
  const skewXAttr = skewX ? `skewX(${skewX.deg})` : "";
  const skewYAttr = skewY ? `skewY(${skewY.deg})` : "";

  return [translateAttr, scaleAttr, rotateAttr, skewXAttr, skewYAttr].join(" ");
}
