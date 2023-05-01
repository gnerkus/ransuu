import { Change, Observable } from "@gullerya/object-observer";
import { GraphNode } from "./SVGContext";

abstract class BaseNode<AttrType> implements GraphNode {
  readonly id: string;
  readonly nodeType: string;
  observableAttrs: Observable & AttrType;
  readonly inputs: Map<Observable, string>;

  constructor(nodeId: string, nodeType: string, attrs: AttrType) {
    this.id = nodeId;
    this.nodeType = nodeType;
    this.inputs = new Map();
    this.observableAttrs = Observable.from<AttrType>(attrs);
  }

  /**
   * call the onConnect method of the destination node
   *
   * @param destination
   * @param handleId : handleId from ReactFlow
   */
  connect(destination: GraphNode, handleId: string) {
    destination.onConnect(this, handleId);
  }

  //
  /**
   * TODO: source nodes should not need the onConnect method
   *
   * called when connection to source node is successful
   *
   * - add source to list of inputs
   * - add listener to watch for changes to source node
   *
   * @param source
   * @param handleId
   */
  onConnect(source: GraphNode, handleId: string) {
    this.inputs.set(source.observableAttrs, handleId);
    Observable.observe(source.observableAttrs, this.onChange);
  }

  abstract onChange(changes: Change[]): void;
}

export default BaseNode;
