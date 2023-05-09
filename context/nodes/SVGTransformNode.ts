import BaseNode from "../BaseNode";
import { PathData, TransformNodeAttrs } from "@/types/path";

class SVGTransformNode extends BaseNode<TransformNodeAttrs, PathData> {
  calculateOutput(): PathData {
    this.attrs.path.attributes.transform = {
      translate: this.attrs.translate,
      scale: this.attrs.scale,
      rotate: this.attrs.rotate,
      skew: this.attrs.skew,
    };

    return this.attrs.path;
  }
}

export default SVGTransformNode;
