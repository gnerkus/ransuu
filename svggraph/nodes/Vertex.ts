import lodashSet from "lodash.set";
import { ResultMap } from "../types";

export default abstract class Vertex<InputType extends object, OutputType> {
  readonly id: string;
  readonly nodeType: string;
  /**
   * Map of property pathnames to vertext ids e.g
   *
   * this.inputs.set(['translate'], "1234")
   * sets the Vertex with id "1234" as the source of the translate input
   */
  readonly inputs: Map<Array<string>, string>;
  // TODO: refine the shape of the attrs
  attrs: InputType;

  constructor(nodeId: string, nodeType: string, attrs: InputType) {
    this.id = nodeId;
    this.nodeType = nodeType;
    this.inputs = new Map();
    this.attrs = attrs;
  }

  setAttrs(attrPath: string, newAttrs: InputType): void {
    lodashSet(this.attrs, attrPath, newAttrs);
  }

  addInput(path: string[], node: Vertex<any, any>): void {
    this.inputs.set(path, node.id);
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
