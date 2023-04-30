import { Observable, Observer } from "@gullerya/object-observer";

export interface GraphNode {
  readonly id: string;
  readonly nodeType: string;
  observableAttrs: Observable;
  readonly inputs: Map<Observable, string>; // map of handleId, GraphNode
  connect(destination: GraphNode, handleId: string): void;
  onConnect(source: GraphNode, handleId: string): void;
  onChange: Observer;
}

class SVGContext {
  readonly nodes: Map<string, GraphNode>;

  constructor() {
    this.nodes = new Map();
  }

  add(node: GraphNode) {
    this.nodes.set(node.id, node);
  }
}

const context = new SVGContext();

export function addNode(node: GraphNode) {
  context.add(node);
}
