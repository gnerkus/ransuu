import { nanoid } from "nanoid";
import DAG from "./DAG";
import SVGOutput from "./nodes/SVGOutput";
import { Shape } from "./types";
import SVGInput from "./nodes/SVGInput";
import SVGVector from "./nodes/SVGVector";
import SVGTransformVertex from "./nodes/SVGTransformVertex";

const initSVG: Shape = {
  attributes: {
    fill: "#cc3399",
    stroke: "#ffffff",
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

const graphRoot = new SVGOutput(outputID, "svg_groupOutputNode", initSVG);
const Graph = new DAG(graphRoot);
const groupInput = new SVGInput(inputID, "svg_groupInputNode", initSVG);
const initVector = new SVGVector(initVectorID, "svg_vectorNode", {
  x: 1,
  y: 1,
});
const initTransform = new SVGTransformVertex(
  initTransformID,
  "svg_transformNode",
  {
    shape: initSVG,
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
