import {
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
  Connection,
} from "reactflow";
import { nanoid } from "nanoid";
import { create } from "zustand";
import { BaseEdge, BaseNode } from "@/types/nodes";
import { addNode } from "@/context/SVGContext";

type OnChange<ChangesType> = (changes: ChangesType[]) => void;

export type FlowState = {
  nodes: BaseNode[];
  edges: BaseEdge[];
  onNodesChange: OnChange<NodeChange>;
  onEdgesChange: OnChange<EdgeChange>;
  addEdge: (data: Connection) => void;
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
    {
      id: "transform_1",
      type: "svg_transformNode",
      position: {
        x: 500,
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
      sourceHandle: null,
      targetHandle: null,
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
    const edge = {
      ...data,
      id,
      source: data.source || "",
      target: data.target || "",
    };

    set({ edges: [edge, ...get().edges] });
  },
}));
