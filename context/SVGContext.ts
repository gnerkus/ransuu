import SVGVectorNode from "./nodes/SVGVectorNode";
import SVGTransformNode from "./nodes/SVGTransformNode";
import * as d3 from "d3";
import SVGInputNode from "./nodes/SVGInputNode";
import SVGOutputNode from "./nodes/SVGOutputNode";
import lodashSet from "lodash.set";
import BaseNode from "./BaseNode";

export type Shape = d3.Selection<SVGGElement, undefined, null, undefined>;
export type ShapeOutput = {
  shape: d3.Selection<SVGGElement, undefined, null, undefined>;
};

class SVGContext {
  readonly nodes: Map<string, BaseNode<any, any>>;

  constructor() {
    this.nodes = new Map();
  }

  connect(sourceId: string, targetId: string, targetHandle: string) {
    const source = this.nodes.get(sourceId);
    if (!source) return;
    const target = this.nodes.get(targetId);
    if (!target) return;

    source.connect(target.id, targetHandle);
  }

  add<Input extends object, Output>(node: BaseNode<Input, Output>) {
    this.nodes.set(node.id, node);
  }

  update<InputType>(id: string, attr: string, value: InputType) {
    const node = this.nodes.get(id);
    // TODO: throw an error here about the id being invalid
    if (!node) return;

    lodashSet(node.attrs, attr, value);

    /**
     * 1. place the updated node in an array
     * 2. for each item in the array, run a reduce
     */
    let workNodes: BaseNode<any, any>[] = [node];

    while (workNodes.length) {
      workNodes = workNodes.reduce((acc, item) => {
        const outputs = item.outputs.reduce((foundOutputs, outputPair) => {
          const outputNode = this.nodes.get(outputPair[0]);
          if (!outputNode) return foundOutputs;

          outputNode.setAttrs(outputPair[1], item.calculateOutput());

          return [...foundOutputs, outputNode];
        }, [] as BaseNode<any, any>[]);
        return [...acc, ...outputs];
      }, [] as BaseNode<any, any>[]);
    }
  }

  getOutputSVG(): string {
    const groupOutputs = Array.from(this.nodes.values())
      .filter((svgNode) => {
        return svgNode.nodeType === "svg_groupOutputNode";
      })
      .map((outputNode) => {
        return outputNode.calculateOutput();
      })
      .join("");

    return `<g>${groupOutputs}</g>`;
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

  input.connect(output.id, "shape");
}

export function addNode(node: BaseNode<any, any>) {
  context.add(node);
}

export function updateNode(id: string, attr: string, value: any) {
  context.update(id, attr, value);
}

export function getOutput(): string {
  return context.getOutputSVG();
}

export function connect(
  sourceId: string,
  targetId: string,
  targetHandle: string
): void {
  context.connect(sourceId, targetId, targetHandle);
}
