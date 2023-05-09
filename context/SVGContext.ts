import SVGVectorNode from "./nodes/SVGVectorNode";
import { nanoid } from "nanoid";
import SVGTransformNode from "./nodes/SVGTransformNode";
import * as d3 from "d3";
import SVGInputNode from "./nodes/SVGInputNode";
import SVGOutputNode from "./nodes/SVGOutputNode";
import lodashSet from "lodash.set";
import BaseNode from "./BaseNode";

export type ShapeOutput = {
  shape: d3.Selection<SVGGElement, undefined, null, undefined>;
};

class SVGContext {
  readonly nodes: Map<string, BaseNode<any, any>>;

  constructor() {
    this.nodes = new Map();
  }

  add<Input, Output>(node: BaseNode<Input, Output>) {
    this.nodes.set(node.id, node);
  }

  update<InputType>(id: string, attr: string, value: InputType) {
    const node = this.nodes.get(id);
    // TODO: throw an error here about the id being invalid
    if (!node) return;

    lodashSet(node.attrs, attr, value);

    // TODO: update all nodes in the tree connected to this node
  }

  getOutputSVG(): string {
    /**
     * TODO:
     * 1. get all output nodes (all nodes of type svg_groupOutputNode)
     * 2. export their svg <g> string
     * 3. group the results into a <g> and return
     */

    return "";
  }
}

const context = new SVGContext();

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
