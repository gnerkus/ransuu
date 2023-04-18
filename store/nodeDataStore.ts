import { create } from "zustand";
import { Point } from "@/types/path";
import { BaseNodeData } from "@/types/nodes";
import { ChangeEvent } from "react";

export type NodeDataState = {
  nodes: Record<string, BaseNodeData>;
  actions: {
    updateNode: (
      id: string,
      data: any,
      inputHandle: string,
      handle?: string
    ) => void;
  };
};

export const useNodeData = (nodeId: string) =>
  useStore((store: NodeDataState) => ({
    nodeValue: store.nodes[nodeId],
    handleNodeInput:
      (inputHandle: string, nodeHandle?: string) =>
      (evt: ChangeEvent<HTMLInputElement>) =>
        store.actions.updateNode(
          nodeId,
          evt.target.value,
          inputHandle,
          nodeHandle
        ),
  }));

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
    transform_: {
      inputs: [],
      outputs: [],
      data: {
        path: {
          points: [
            { x: 32, y: 32 },
            { x: 128, y: 32 },
            { x: 128, y: 128 },
            { x: 32, y: 128 },
          ] as Point[],
          attributes: { fill: "#cc3399", stroke: "##ffffff" },
        },
        translate: [0, 0],
        rotate: [0, 0, 0],
        scale: [1, 1],
        skewX: 0,
        skewY: 0,
      },
    },
  },
  actions: {
    updateNode(id, data, inputHandle, handle) {
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
  },
}));
