import { DAGFunctions, ResultMap } from "../types";
import Vertex from "../Vertex";

export default class SVGInput extends Vertex<DAGFunctions, DAGFunctions> {
  execute(resultMap: ResultMap): ResultMap {
    resultMap.set(this.id, this.attrs);
    return resultMap;
  }
}
