import { PathData, PathInput } from "@/types/path";
import BaseNode from "../BaseNode";

class SVGOutputNode extends BaseNode<PathInput, PathData> {
  calculateOutput(): PathData {
    return this.attrs.path;
  }
}

export default SVGOutputNode;
