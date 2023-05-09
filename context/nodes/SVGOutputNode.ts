import BaseNode from "../BaseNode";
import { ShapeOutput } from "../SVGContext";

class SVGOutputNode extends BaseNode<ShapeOutput, string> {
  calculateOutput(): string {
    return this.attrs.shape.html();
  }
}

export default SVGOutputNode;
