import Vertex from "../Vertex";
import {
  NodeAttrType,
  NumberValue,
  TransformNodeAttrType,
} from "../types";
import { Vec2 } from "@thi.ng/vectors";
import { asPath, transform } from "@thi.ng/geom";
import {
  skewX23,
  skewY23,
  concat,
  translation23,
  rotation23,
  scale23,
} from "@thi.ng/matrices";

class SVGTransformNode extends Vertex<TransformNodeAttrType> {
  execute(resultMap: Map<string, NodeAttrType>) {
    const translateNodeInput = this.inputsByPath.get("translate");
    const translate = translateNodeInput
      ? (resultMap.get(translateNodeInput.id) as Vec2)
      : this.attrs.translate;

    const scaleNodeInput = this.inputsByPath.get("scale");
    const scale = scaleNodeInput
      ? (resultMap.get(scaleNodeInput.id) as Vec2)
      : this.attrs.scale;

    const skewXNodeInput = this.inputsByPath.get("skewX");
    const skewX = skewXNodeInput
      ? (resultMap.get(skewXNodeInput.id) as NumberValue)
      : this.attrs.skewX;

    const skewYNodeInput = this.inputsByPath.get("skewY");
    const skewY = skewYNodeInput
      ? (resultMap.get(skewYNodeInput.id) as NumberValue)
      : this.attrs.skewY;

    const rotateNodeInput = this.inputsByPath.get("rotate");
    const rotate = rotateNodeInput
      ? (resultMap.get(rotateNodeInput.id) as NumberValue)
      : this.attrs.rotate;

    const finalTransform = transform(
      this.attrs.shape,
      concat(
        [],
        translation23([], [translate.x, translate.y]),
        skewX23([], skewX.value),
        skewY23([], skewY.value),
        rotation23([], rotate.value),
        scale23([], [scale.x, scale.y])
      )
    );

    resultMap.set(this.id, asPath(finalTransform));
    return resultMap;
  }
}

export default SVGTransformNode;
