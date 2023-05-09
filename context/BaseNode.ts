type ConnectionPair = [string, string];

abstract class BaseNode<InputType, OutputType> {
  readonly id: string;
  readonly nodeType: string;
  outputs: ConnectionPair[] = [];
  attrs: InputType;

  constructor(nodeId: string, nodeType: string, attrs: InputType) {
    this.id = nodeId;
    this.nodeType = nodeType;
    this.attrs = attrs;
  }

  setAttrs(newAttrs: InputType): void {
    this.attrs = newAttrs;
  }

  /**
   *
   *
   * @param target : target node
   * @param handleId : field of the target node that this node is connected to as an input
   */
  connect(targetId: string, handleId: string) {
    this.outputs.push([targetId, handleId]);
  }

  abstract calculateOutput(): OutputType;
}

export default BaseNode;
