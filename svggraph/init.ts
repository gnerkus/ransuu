import { nanoid } from "nanoid";
import DAG from "./DAG";
import SVGOutput from "./nodes/SVGOutput";
import { DAGFunctions } from "./types";
import SVGInput from "./nodes/SVGInput";
import SVGVector from "./nodes/SVGVector";
import SVGTransformNode from "./nodes/SVGTransformNode";

export const initDAG: DAGFunctions = {
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

const rootID = nanoid(6);
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

const graphRoot = new SVGOutput(rootID, "svg_rootNode", initDAG);
const dagInstance = new DAG(graphRoot);
const groupOutput = new SVGOutput(outputID, "svg_groupOutputNode", initDAG);
const groupInput = new SVGInput(inputID, "svg_groupInputNode", initDAG);
const initVector = new SVGVector(initVectorID, "svg_vectorNode", {
  x: 0,
  y: 0,
});
const initTransform = new SVGTransformNode(
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
dagInstance.addNode(groupOutput);
dagInstance.addNode(groupInput);
dagInstance.addNode(initVector);
dagInstance.addNode(initTransform);

dagInstance.connect(groupInput, initTransform, ["shape"]);
dagInstance.connect(initVector, initTransform, ["translate"]);
dagInstance.connect(initTransform, groupOutput, ["shape"]);
dagInstance.connect(groupOutput, graphRoot, [""]);

export default dagInstance;
