import { ResultMap } from "../types";
import Vertex from "./Vertex";
import { Point } from "@/types/path";

class SVGVector extends Vertex<Point, Point> {
  execute(resultMap: ResultMap): ResultMap {
    resultMap.set(this.id, this.attrs);
    return resultMap;
  }
}

export default SVGVector;
