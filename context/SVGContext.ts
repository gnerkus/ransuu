import { Observable, Observer } from "@gullerya/object-observer";
import SVGVectorNode from "./nodes/SVGVectorNode";
import { nanoid } from "nanoid";
import SVGTransformNode from "./nodes/SVGTransformNode";
import * as d3 from "d3";
import SVGInputNode from "./nodes/SVGInputNode";
import SVGOutputNode from "./nodes/SVGOutputNode";
import lodashSet from "lodash.set";

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
  outputId: string = "";

  constructor() {
    this.nodes = new Map();
  }

  add(node: GraphNode) {
    this.nodes.set(node.id, node);
  }

  update(id: string, attr: string, value: any) {
    const node = this.nodes.get(id);
    // TODO: throw an error here about the id being invalid
    if (!node) return;

    lodashSet(node.observableAttrs, attr, value);
  }

  getOutputSVG(): string {
    const outputNode = this.nodes.get(this.outputId) as SVGOutputNode;
    if (!outputNode) return "";

    return outputNode.observableAttrs.shape.html();
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

/**
 * TODO: limit this to just the input and output nodes once the add node functionality has been implemented
 * @param nodeIds
 */
export function createDefaultNodes(
  inputID: string,
  outputID: string,
  vectorID: string,
  transformID: string
) {
  const svgGroup = d3.create("g");
  const input = new SVGInputNode(inputID, "svg_groupInputNode", {
    shape: svgGroup,
  });
  context.add(input);
  const output = new SVGOutputNode(outputID, "svg_groupOutputNode", {
    shape: svgGroup,
  });
  context.add(output);
  const vector = new SVGVectorNode(vectorID, "svg_vectorNode", { x: 1, y: 1 });
  context.add(vector);
  const transform = new SVGTransformNode(transformID, "svg_transformNode", {
    shape: svgGroup,
    translate: { x: 0, y: 0 },
    rotate: { angle: 0, centerX: 0, centerY: 0 },
    scale: { x: 1, y: 1 },
    skew: { x: 0, y: 0 },
  });
  context.add(transform);

  context.outputId = outputID;

  input.connect(transform, "shape");
  vector.connect(transform, "translate");
  transform.connect(output, "shape");
}

export function addNode(node: GraphNode) {
  context.add(node);
}

export function updateNode(id: string, attr: string, value: any) {
  context.update(id, attr, value);
}

export function getOutput(): string {
  return context.getOutputSVG();
}
