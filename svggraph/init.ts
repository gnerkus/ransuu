import { nanoid } from "nanoid";
import DAG from "./DAG";
import SVGOutput from "./nodes/SVGOutput";
import { DAGFunctions, Shape } from "./types";
import SVGInput from "./nodes/SVGInput";
import SVGVector from "./nodes/SVGVector";
import SVGTransformVertex from "./nodes/SVGTransformVertex";

// TODO: move this to the zustand store
const initSVG: Shape = {
  instance: [],
  path: [
    { command: "M", args: [0, 0] },
    { command: "H", args: [0 + 32] },
    { command: "V", args: [0 + 32] },
    { command: "H", args: [0] },
    { command: "z", args: [] },
  ],
  attributes: {
    fill: "#cc3399",
    stroke: "#ffffff",
  },
};

const initDAG: DAGFunctions = {
  instance: [],
  path: () => [
    { command: "M", args: [0, 0] },
    { command: "H", args: [0 + 32] },
    { command: "V", args: [0 + 32] },
    { command: "H", args: [0] },
    { command: "z", args: [] },
  ],
  attributes: {
    fill: () => "#cc3399",
    stroke: () => "#ffffff",
  },
};

const inputID = nanoid(6);
const outputID = nanoid(6);
const initVectorID = nanoid(6);
const initTransformID = nanoid(6);

export const IDS = {
  inputID,
  outputID,
  initVectorID,
  initTransformID,
};

const graphRoot = new SVGOutput(outputID, "svg_groupOutputNode", initDAG);
const Graph = new DAG(graphRoot);
const groupInput = new SVGInput(inputID, "svg_groupInputNode", initDAG);
const initVector = new SVGVector(initVectorID, "svg_vectorNode", {
  x: 1,
  y: 1,
});
const initTransform = new SVGTransformVertex(
  initTransformID,
  "svg_transformNode",
  {
    shape: initDAG,
    translate: { x: 0, y: 0 },
    rotate: { angle: 0, centerX: 0, centerY: 0 },
    scale: { x: 1, y: 1 },
    skew: { x: 0, y: 0 },
  }
);
Graph.addNode(groupInput);
Graph.addNode(initVector);
Graph.addNode(initTransform);

Graph.connect(groupInput, initTransform, ["shape"]);
Graph.connect(initVector, initTransform, ["translate"]);
Graph.connect(initTransform, graphRoot, [""]);

export default Graph;
