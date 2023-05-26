import { DAGFunctions, ResultMap, Shape } from "../types";
import Vertex from "../Vertex";

export default class SVGOutput extends Vertex<DAGFunctions, Shape> {
  execute(resultMap: ResultMap): ResultMap {
    resultMap.set(this.id, { ...this.attrs });
    return resultMap;
  }
}
