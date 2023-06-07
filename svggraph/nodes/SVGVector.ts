import { Vec2 } from "@thi.ng/vectors";
import { NodeAttrType } from "../types";
import Vertex from "../Vertex";

class SVGVector extends Vertex<Vec2> {
  execute(resultMap: Map<string, NodeAttrType>) {
    resultMap.set(this.id, this.attrs);
    return resultMap;
  }
}

export default SVGVector;
