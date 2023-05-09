import BaseNode from "../BaseNode";
import { ShapeOutput } from "../SVGContext";

class SVGInputNode extends BaseNode<ShapeOutput, ShapeOutput> {
  calculateOutput(): ShapeOutput {
    return this.attrs;
  }
}

export default SVGInputNode;
