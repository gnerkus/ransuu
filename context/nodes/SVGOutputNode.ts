import { Change } from "@gullerya/object-observer";
import BaseNode from "../BaseNode";

type OutputNodeAttrs = {
  shape: d3.Selection<SVGGElement, undefined, null, undefined>;
};

class SVGOutputNode extends BaseNode<OutputNodeAttrs> {
  onChange(changes: Change[]): void {
    changes.forEach((change) => {
      this.observableAttrs.shape = change.value;
    });
  }
}

export default SVGOutputNode;
