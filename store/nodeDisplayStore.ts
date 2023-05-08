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
      data: {
        path: {
          points: [
            { x: 32, y: 32 },
            { x: 128, y: 32 },
            { x: 128, y: 128 },
            { x: 32, y: 128 },
          ],
          attributes: { fill: "#cc3399", stroke: "##ffffff" },
        },
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
        path: {
          points: [
            { x: 32, y: 32 },
            { x: 128, y: 32 },
            { x: 128, y: 128 },
            { x: 32, y: 128 },
          ],
          attributes: { fill: "#cc3399", stroke: "##ffffff" },
        },
      },
    },
    {
      id: "vector_1",
      type: "svg_vectorNode",
      position: {
        x: 300,
        y: 200,
      },
      data: {
        vector: {
          x: 1,
          y: 1,
        },
      },
    },
    {
      id: "transform_1",
      type: "svg_transformNode",
      position: {
        x: 500,
        y: 200,
      },
      data: {
        path: {
          points: [
            { x: 32, y: 32 },
            { x: 128, y: 32 },
            { x: 128, y: 128 },
            { x: 32, y: 128 },
          ],
          attributes: { fill: "#cc3399", stroke: "##ffffff" },
        },
        translate: { x: 0, y: 0 },
        rotate: { angle: 0, centerX: 0, centerY: 0 },
        scale: { x: 1, y: 1 },
        skew: { x: 0, y: 0 },
      },
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
