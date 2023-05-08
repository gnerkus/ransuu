import { Observable, Observer } from "@gullerya/object-observer";
import SVGVectorNode from "./nodes/SVGVectorNode";
import { nanoid } from "nanoid";
import { Point } from "@/types/path";
import SVGTransformNode from "./nodes/SVGTransformNode";
import * as d3 from "d3";
import SVGInputNode from "./nodes/SVGInputNode";
import SVGOutputNode from "./nodes/SVGOutputNode";

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

/**
 * default nodes
 *
 */
const svgGroup = d3.create("g");
const input = new SVGInputNode(nanoid(6), "input", { shape: svgGroup });
context.add(input);
const output = new SVGOutputNode(nanoid(6), "output", { shape: svgGroup });
context.add(output);
const vector = new SVGVectorNode(nanoid(6), "svg_vectorNode", { x: 1, y: 1 });
context.add(vector);
const transform = new SVGTransformNode(nanoid(6), "svg_transformNode", {
  shape: svgGroup,
  translate: { x: 0, y: 0 },
  rotate: { angle: 0, centerX: 0, centerY: 0 },
  scale: { x: 1, y: 1 },
  skew: { x: 0, y: 0 },
});
context.add(transform);

input.connect(transform, "shape");
vector.connect(transform, "translate");
transform.connect(output, "shape");

export function addNode(node: GraphNode) {
  context.add(node);
}
