import lodashSet from "lodash.set";
import { ResultMap } from "../types";

export default abstract class Vertex<InputType extends object, OutputType> {
  readonly id: string;
  readonly nodeType: string;
  /**
   * Map of property pathnames to vertex e.g
   *
   * this.inputs.set(['translate'], new Vertex())
   * sets the Vertex with id "1234" as the source of the translate input
   *
   * used when computing the output of a node
   */
  readonly inputsByPath: Map<string, Vertex<any, any>>;

  // TODO: refine the shape of the attrs
  attrs: InputType;

  constructor(nodeId: string, nodeType: string, attrs: InputType) {
    this.id = nodeId;
    this.nodeType = nodeType;
    this.inputsByPath = new Map();
    this.attrs = attrs;
  }

  setAttrs(attrPath: string, newAttrs: InputType): void {
    lodashSet(this.attrs, attrPath, newAttrs);
  }

  addInput(path: string[], node: Vertex<any, any>): void {
    // join the path to allow unique
    this.inputsByPath.set(path.join("."), node);
  }

  deleteInput(node: Vertex<any, any>): boolean {
    const nodePathPair = Array.from(this.inputsByPath.entries()).filter(
      (entry) => entry[1] === node
    )[0];

    if (nodePathPair) {
      return this.inputsByPath.delete(nodePathPair[0]);
    }

    return false;
  }

  /**
   * Given a result map, it is guaranteed that all the data required to solve this node
   * is present in the map. The node then updates the map with its own data.
   *
   * The calculation for the node's output depends on the node type
   * @param resultMap
   */
  abstract execute(resultMap: ResultMap): ResultMap;
}
