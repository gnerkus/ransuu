import { PathData, PathInput } from "@/types/path";
import BaseNode from "../BaseNode";

class SVGInputNode extends BaseNode<PathData, PathInput> {
  calculateOutput(): PathInput {
    return {
      path: this.attrs,
    };
  }
}

export default SVGInputNode;
