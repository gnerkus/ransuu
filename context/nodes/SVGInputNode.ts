import { Change } from "@gullerya/object-observer";
import BaseNode from "../BaseNode";
import * as d3 from "d3";

type InputNodeAttrs = {
  shape: d3.Selection<SVGGElement, undefined, null, undefined>;
};

class SVGInputNode extends BaseNode<InputNodeAttrs> {
  /**
   * TODO: source nodes do not need to implement onChange
   * @param changes
   */
  onChange(changes: Change[]) {}
}

export default SVGInputNode;
