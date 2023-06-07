import { rect, withAttribs, asPath } from "@thi.ng/geom";
import { nanoid } from "nanoid";
import SVGOutput from "./nodes/SVGOutput";
import DAG from "./DAG";
import SVGInput from "./nodes/SVGInput";
import SVGVector from "./nodes/SVGVector";
import SVGTransformNode from "./nodes/SVGTransformNode";
import { Vec2 } from "@thi.ng/vectors";
import Vertex from "./Vertex";
import { NodeAttrType } from "./types";

export const initialShape = asPath(withAttribs(rect(5), { fill: "#cc3399", stroke: "#ffffff" }));

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

const graphRoot = new SVGOutput(rootID, "svg_rootNode", initialShape);
const dagInstance = new DAG<Vertex<NodeAttrType>>(graphRoot);
const groupOutput = new SVGOutput(outputID, "svg_groupOutputNode", initialShape);
const groupInput = new SVGInput(inputID, "svg_groupInputNode", initialShape);
const initVector = new SVGVector(initVectorID, "svg_vectorNode", new Vec2([0, 0]));
const initTransform = new SVGTransformNode(
  initTransformID,
  "svg_transformNode",
  {
    shape: initialShape,
    translate: new Vec2([0, 0]),
    rotate: { value: 0},
    scale: new Vec2([1, 1]),
    skewX: {value: 0},
    skewY: {value: 0},
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
