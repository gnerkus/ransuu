import {
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
} from "reactflow";
import { nanoid } from "nanoid";
import { create } from "zustand";
import { Point } from "@/types/path";
import {
  BaseEdge,
  BaseEdgeData,
  BaseNode,
  BaseNodeUpdateData,
} from "@/types/nodes";

type OnChange<ChangesType> = (changes: ChangesType[]) => void;

export type FlowState = {
  nodes: BaseNode[];
  edges: BaseEdge[];
  onNodesChange: OnChange<NodeChange>;
  onEdgesChange: OnChange<EdgeChange>;
  addEdge: (data: BaseEdgeData) => void;
  updateNode: (id: string, data: BaseNodeUpdateData) => void;
};

export const useStore = create<FlowState>((set, get) => ({
  nodes: [
    {
      id: "input",
      type: "svg_groupInputNode",
      position: {
        x: 100,
        y: 100,
      },
      data: {
        points: [
          { x: 32, y: 32 },
          { x: 128, y: 32 },
          { x: 128, y: 128 },
          { x: 32, y: 128 },
        ] as Point[],
        attributes: { fill: "#cc3399", stroke: "##ffffff" },
      },
    },
    {
      id: "output",
      type: "svg_groupOutputNode",
      position: {
        x: 500,
        y: 100,
      },
      data: {
        points: [
          { x: 32, y: 32 },
          { x: 128, y: 32 },
          { x: 128, y: 128 },
          { x: 32, y: 128 },
        ] as Point[],
        attributes: { fill: "#cc3399", stroke: "##ffffff" },
      },
    },
    {
      id: "3",
      type: "svg_vectorNode",
      position: {
        x: 300,
        y: 200,
      },

      data: {
        x: 1,
        y: 1,
      },
    },
  ],
  edges: [
    {
      id: "e1-2",
      source: "input",
      target: "output",
    },
  ],

  onNodesChange(changes) {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange(changes) {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  addEdge(data) {
    const id = nanoid(6);
    const edge = { id, ...data };

    set({ edges: [edge, ...get().edges] });
  },

  updateNode(id, data) {
    /**
     * TODO:
     * - run the generator
     */
    set({
      nodes: get().nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node
      ),
    });
  },
}));
