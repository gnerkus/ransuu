import { ResultMap, Shape } from "../types";
import Vertex from "./Vertex";

export default class SVGInput extends Vertex<Shape, Shape> {
  execute(resultMap: ResultMap): ResultMap {
    resultMap.set(this.id, this.attrs);
    return resultMap;
  }
}
