import { DAGFunctions, ResultMap, Shape } from "../types";
import Vertex from "../Vertex";

export default class SVGOutput extends Vertex<DAGFunctions, Shape> {
  execute(resultMap: ResultMap): ResultMap {
    let result = { ...this.attrs };
    const shapeNodeInput = this.inputsByPath.get("shape");

    if (shapeNodeInput) {
      result = resultMap.get(shapeNodeInput.id) as DAGFunctions;
    }

    resultMap.set(this.id, result);
    return resultMap;
  }
}
