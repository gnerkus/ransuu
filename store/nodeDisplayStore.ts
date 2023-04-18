import {
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
} from "reactflow";
import { nanoid } from "nanoid";
import { create } from "zustand";
import { Point } from "@/types/path";
import { BaseEdge, BaseEdgeData, BaseNode } from "@/types/nodes";

type OnChange<ChangesType> = (changes: ChangesType[]) => void;

export type FlowState = {
  nodes: BaseNode[];
  edges: BaseEdge[];
  onNodesChange: OnChange<NodeChange>;
  onEdgesChange: OnChange<EdgeChange>;
  addEdge: (data: BaseEdgeData) => void;
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
      data: {},
    },
    {
      id: "output",
      type: "svg_groupOutputNode",
      position: {
        x: 500,
        y: 100,
      },
      data: {},
    },
    {
      id: "vector_1",
      type: "svg_vectorNode",
      position: {
        x: 300,
        y: 200,
      },
      data: {},
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
}));
