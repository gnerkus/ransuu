import { produce } from "immer";
import { create } from "zustand";
import { Point } from "@/types/path";
import { BaseNodeData } from "@/types/nodes";
import { ChangeEvent } from "react";
import lodashSet from "lodash.set";
import { mountStoreDevtool } from "simple-zustand-devtools";

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
    transform_1: {
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
        translate: { x: 0, y: 0 },
        rotate: { angle: 0, centerX: 0, centerY: 0 },
        scale: { x: 1, y: 1 },
        skew: { x: 0, y: 0 },
      },
    },
  },
  actions: {
    updateNode(id, data, inputHandle, handle) {
      const node = get().nodes[id];
      const outputs = node.outputs;

      set({
        nodes: produce(get().nodes, (draftState) => {
          lodashSet(draftState[id].data, inputHandle, data);
        }),
      });

      if (handle) {
        outputs.forEach((outputId) => {
          set({
            nodes: produce(get().nodes, (draftState) => {
              lodashSet(draftState[outputId].data, handle, data);
            }),
          });
        });
      }
    },
  },
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("NodeData", useStore);
}
