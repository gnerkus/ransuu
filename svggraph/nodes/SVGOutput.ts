import { NodeAttrType, SVGData } from "../types";
import Vertex from "../Vertex";

export default class SVGOutput extends Vertex<SVGData> {
  execute(resultMap: Map<string, NodeAttrType>) {
    // NOTE: result shares the same reference as this.attrs
    let result = this.attrs;
    const shapeNodeInput = this.inputsByPath.get("shape");

    if (shapeNodeInput) {
      result = resultMap.get(shapeNodeInput.id) as SVGData;
    }

    resultMap.set(this.id, result);
    return resultMap;
  }
}
