import { create } from "zustand";
import { Point } from "@/types/path";
import { BaseNodeData } from "@/types/nodes";

export type NodeDataState = {
  nodes: Record<string, BaseNodeData>;
  updateNode: (
    id: string,
    data: any,
    inputHandle: string,
    handle?: string
  ) => void;
};

export const useStore = create<NodeDataState>((set, get) => ({
  nodes: {
    input: {
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
    output: {
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
    vector_1: {
      inputs: [],
      outputs: [],
      data: {
        x: 1,
        y: 1,
      },
    },
  },
  updateNode(id, data, inputHandle, handle) {
    console.log("data", data);
    const node = get().nodes[id];
    const outputs = node.outputs;
    // 1. update the node's own data
    set({
      nodes: {
        ...get().nodes,
        [id]: {
          ...get().nodes[id],
          data: {
            ...get().nodes[id].data,
            [inputHandle]: data,
          },
        },
      },
    });

    if (handle) {
      outputs.forEach((outputId) => {
        set({
          nodes: {
            ...get().nodes,
            [outputId]: {
              ...get().nodes[outputId],
              data: {
                ...get().nodes[outputId].data,
                [handle]: data,
              },
            },
          },
        });
      });
    }
  },
}));
