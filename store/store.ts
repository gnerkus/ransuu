import {
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
} from "reactflow";
import { nanoid } from "nanoid";
import { create } from "zustand";
import { PathData, Point } from "@/types/path";
import {
  BaseEdge,
  BaseEdgeData,
  BaseNode,
  BaseNodeData,
  BaseNodeUpdateData,
} from "@/types/nodes";

type OnChange<ChangesType> = (changes: ChangesType[]) => void;

type ChangedNodeParams = {
  id: string;
  handle?: string;
  data: any;
};

export type FlowState = {
  initialPath: PathData;
  changedNode?: ChangedNodeParams;
  nodes: BaseNode[];
  edges: BaseEdge[];
  onNodesChange: OnChange<NodeChange>;
  onEdgesChange: OnChange<EdgeChange>;
  addEdge: (data: BaseEdgeData) => void;
  updateNode: (id: string, data: any, handle?: string) => void;
};

export const useStore = create<FlowState>((set, get) => ({
  initialPath: {
    points: [
      { x: 32, y: 32 },
      { x: 128, y: 32 },
      { x: 128, y: 128 },
      { x: 32, y: 128 },
    ] as Point[],
    attributes: { fill: "#cc3399", stroke: "##ffffff" },
  },
  nodes: [
    {
      id: "input",
      type: "svg_groupInputNode",
      position: {
        x: 100,
        y: 100,
      },
      data: {
        inputs: [],
        outputs: ["output"],
        path: {
          points: [
            { x: 32, y: 32 },
            { x: 128, y: 32 },
            { x: 128, y: 128 },
            { x: 32, y: 128 },
          ] as Point[],
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
        inputs: ["input"],
        outputs: [],
        path: {
          points: [
            { x: 32, y: 32 },
            { x: 128, y: 32 },
            { x: 128, y: 128 },
            { x: 32, y: 128 },
          ] as Point[],
          attributes: { fill: "#cc3399", stroke: "##ffffff" },
        },
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
        inputs: [],
        outputs: [],
        data: {
          x: 1,
          y: 1,
        },
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

  updateNode(id, data, handle) {
    set({
      changedNode: {
        id,
        data,
        handle,
      },
      nodes: get().nodes.map((node) =>
        node.id === id
          ? {
              ...node,
              data: { ...node.data, data: { ...node.data.data, ...data } },
            }
          : node
      ),
    });
  },
}));
