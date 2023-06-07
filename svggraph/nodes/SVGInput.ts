import { NodeAttrType, SVGData } from "../types";
import Vertex from "../Vertex";

export default class SVGInput extends Vertex<SVGData> {
  execute(resultMap: Map<string, NodeAttrType>) {
    resultMap.set(this.id, this.attrs);
    return resultMap;
  }
}
