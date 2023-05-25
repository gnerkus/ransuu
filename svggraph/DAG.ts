import { nanoid } from "nanoid";
import Vertex from "./Vertex";
import { ResultMap } from "./types";

type LeafNodesResult = {
  freqMap: Map<Vertex<any, any>, number>;
  leafNodes: Vertex<any, any>[];
};

const isNode = (vertex: unknown) => vertex instanceof Vertex;

/**
 * Given a map recursively delete all orphan nodes.
 * @param {!Map} graph example:
 *    const G = new Map([
 *      [ 'A', new Set(['B', 'C']) ],
 *      [ 'B', new Set(['C', 'D']) ],
 *      [ 'C', new Set(['D']) ],
 *      [ 'E', new Set(['F']) ],
 *      [ 'F', new Set(['C']) ],
 *      [ 'D', new Set([]) ]
 *    ]);
 * @returns {!Map}
 */
const removeOrphans = (graph: Map<Vertex<any, any>, Set<Vertex<any, any>>>) => {
  for (const [vertex, outputs] of Array.from(graph.entries())) {
    if (outputs.size === 0 && Boolean(vertex)) {
      graph.delete(vertex);
      // remove the node from existing edges
      for (const otherVertexOutputs of Array.from(graph.values())) {
        otherVertexOutputs.delete(vertex);
      }
    }
  }
  // repeat if new orphans were created
  if (
    Array.from(graph.entries()).reduce(
      (accumulator, entry: [Vertex<any, any>, Set<Vertex<any, any>>]) =>
        accumulator || (entry[1].size === 0 && Boolean(entry[0])),
      false
    )
  ) {
    removeOrphans(graph);
  }
  return graph;
};

/**
 * Given a map of a dag in the form below, return an array of leaf nodes, that
 * is, nodes with 0 in degrees / nodes where no edges point to it.
 * @param graph
 * Example: const G = new Map([
 *  ['A', new Set(['B', 'C'])]
 * ])
 * @returns {
 *  freqMap: Map<Vertex<any, any>, number>,
 * leafNodes: Vertex<any, any>[]
 * }
 */
const getLeafNodes = (
  graph: Map<Vertex<any, any>, Set<Vertex<any, any>>>
): LeafNodesResult => {
  // Build a map of the form:
  // { A: 0, B: 1, C: 3, E: 0, F: 1, D: 2 }
  // where each key in the DAG is notated with the number of times it
  // appears as a value. In terms of a DAG, this describes how many edges
  // point to this node.
  /**
   * A map of nodes to the number of times
   *  that node has an in-edge. Leaf-nodes will have a value of 0
   */
  const freqMap = Array.from(graph.keys()).reduce(
    (accumulator, nodeId) => accumulator.set(nodeId, 0),
    new Map<Vertex<any, any>, number>()
  );
  Array.from(graph.values()).forEach((outputs: Set<Vertex<any, any>>) =>
    outputs.forEach((vertex) => {
      const vertexFreq = freqMap.get(vertex);

      freqMap.set(vertex, vertexFreq ? vertexFreq + 1 : 0);
    })
  );

  /**
   * A List of nodes without any in degrees
   */
  const leafNodes = Array.from(graph.keys()).filter(
    (vertex) => freqMap.get(vertex) === 0
  );
  return { freqMap, leafNodes };
};

/**
 * Given the DAG as below, return an array where the nodes of the DAG
 * are topologically sorted.
 * example:
 *    [ 'E', 'F', 'A', 'B', 'C', 'D' ]
 * @param {!Map} graph example:
 *    const G = new Map([
 *      [ 'A', new Set(['B', 'C']) ],
 *      [ 'B', new Set(['C', 'D']) ],
 *      [ 'C', new Set(['D']) ],
 *      [ 'E', new Set(['F']) ],
 *      [ 'F', new Set(['C']) ],
 *      [ 'D', new Set([]) ]
 *    ]);
 * @returns {!Array<!Vertex>}
 */
const topoSort = (
  graph: Map<Vertex<any, any>, Set<Vertex<any, any>>>
): Vertex<any, any>[] => {
  const { freqMap, leafNodes } = getLeafNodes(graph);

  // The result array.
  const sortedNodes = [];

  // leafNodes is handled as a STACK
  while (leafNodes.length) {
    const node = leafNodes.pop();
    if (!node) break;

    sortedNodes.push(node);
    const nodeOutputs = graph.get(node) || new Set();
    Array.from(nodeOutputs).forEach((vertex) => {
      freqMap.set(vertex, Math.max((freqMap.get(vertex) || 0) - 1, 0));
      // wait until all child nodes of vertex have been added to the sortedNodes
      if (freqMap.get(vertex) === 0) {
        leafNodes.push(vertex);
      }
    });
  }
  return sortedNodes;
};

export default class DAG {
  readonly id: string;
  readonly root: Vertex<any, any>;
  readonly graph: Map<Vertex<any, any>, Set<Vertex<any, any>>>;
  constructor(root: Vertex<any, any>) {
    this.id = nanoid(6);
    this.graph = new Map();
    this.root = root;
  }

  getNode(id: string): Vertex<any, any> | undefined {
    return Array.from(this.graph.keys()).find((vertex) => vertex.id === id);
  }

  /**
   *
   * @returns a list of nodes in order of addition
   */
  getNodes(): Vertex<any, any>[] {
    return Array.from(this.graph.keys());
  }

  getTopo(): Vertex<any, any>[] {
    return topoSort(this.graph);
  }

  getLeafs(): LeafNodesResult {
    return getLeafNodes(this.graph);
  }

  getOrphans(): Vertex<any, any>[] {
    const orphans = [];
    for (const [vertex, outputs] of Array.from(this.graph.entries())) {
      if (outputs.size === 0 && Boolean(vertex)) {
        orphans.push(vertex);
      }
    }

    return orphans;
  }

  /**
   * Add a node to the graph without connecting it
   * @param node the node to be added
   * @returns false, if the node is invalid otherwise, returns the node
   */
  addNode(node: Vertex<any, any>): false | Vertex<any, any> {
    if (!isNode(node)) return false;
    if (this.graph.has(node)) return node;

    this.graph.set(node, new Set());
    return node;
  }

  deleteNode(node: Vertex<any, any>) {
    let deleted = false;
    if (isNode(node) && node !== this.root) {
      deleted = this.graph.delete(node);
      if (deleted) {
        for (const [vertex, outputs] of Array.from(this.graph.entries())) {
          outputs.delete(node);
          vertex.deleteInput(node);
        }
      }
    }

    return deleted;
  }

  connect(
    input: Vertex<any, any>,
    target: Vertex<any, any>,
    inputHandlePath: string[]
  ): boolean | DAG {
    if (!(isNode(input) && isNode(target))) {
      return false;
    }

    // Root cannot be made an input to another node to prevent cycles
    if (input === this.root) {
      return this;
    }

    const inputOutputs = this.graph.get(input);
    // Only members of the graph can be connected
    if (!inputOutputs) {
      return this;
    }

    if (!this.graph.has(target)) {
      return this;
    }

    // Nodes with an existing connection cannot be reconnected to prevent cycles
    if (inputOutputs.has(target)) {
      return this;
    }

    inputOutputs.add(target);
    target.addInput(inputHandlePath, input);

    if (this.getTopo().length < this.getNodes().length) {
      this.disconnect(input, target);
    }

    return this;
  }

  disconnect(input: Vertex<any, any>, target: Vertex<any, any>): boolean | DAG {
    if (!(isNode(input) && isNode(target))) {
      return false;
    }

    const inputOutputs = this.graph.get(input);

    if (inputOutputs) {
      inputOutputs.delete(target);
      target.deleteInput(input);
    }

    return this;
  }

  clean() {
    this.getOrphans().forEach((orphan) => this.deleteNode(orphan));
    if (this.getOrphans().length) {
      this.clean();
    }

    return this;
  }

  solve() {
    const resultMap: ResultMap = new Map();

    const noOrphans = removeOrphans(this.graph);
    const validTopoNodes = this.getTopo().filter((node) => noOrphans.has(node));

    return validTopoNodes.reduce((accumulator, node) => {
      return node.execute(accumulator);
    }, resultMap);
  }
}
