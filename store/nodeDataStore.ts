import { produce, enableMapSet } from "immer";
import { create } from "zustand";
import { Point } from "@/types/path";
import { BaseNodeData, HandleOutputPair } from "@/types/nodes";
import { ChangeEvent } from "react";
import lodashSet from "lodash.set";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { Connection } from "reactflow";

enableMapSet();

export type NodeDataState = {
  nodes: Record<string, BaseNodeData>;
  actions: {
    updateNode: (id: string, data: any, inputHandle: string) => void;
    updateNodeOutputs: (id: string, data: any, inputHandle: string) => void;
    addEdge: (connection: Connection) => void;
  };
};

export const useNodeData = (nodeId: string) =>
  useStore((store: NodeDataState) => ({
    nodeValue: store.nodes[nodeId],
    handleNodeInput:
      (inputHandle: string) => (evt: ChangeEvent<HTMLInputElement>) =>
        store.actions.updateNode(nodeId, evt.target.value, inputHandle),
    handleUpdateOutputs: (nodeId: string, newData: any, inputHandle: string) =>
      store.actions.updateNodeOutputs(nodeId, newData, inputHandle),
  }));

export const useStore = create<NodeDataState>((set, get) => ({
  nodes: {
    input: {
      outputs: new Set<HandleOutputPair>().add({
        id: "output",
        handle: "path",
      }),
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
      },
    },
    output: {
      outputs: new Set<HandleOutputPair>(),
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
      },
    },
    vector_1: {
      outputs: new Set<HandleOutputPair>(),
      data: {
        x: 1,
        y: 1,
      },
    },
    transform_1: {
      outputs: new Set<HandleOutputPair>(),
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
    updateNode(id, data, inputHandle) {
      set({
        nodes: produce(get().nodes, (draftState) => {
          lodashSet(draftState[id].data, inputHandle, data);
        }),
      });

      this.updateNodeOutputs(id, data, inputHandle);
    },
    updateNodeOutputs(id, data, inputHandle) {
      const node = get().nodes[id];
      const outputs = node.outputs;

      outputs.forEach((handleOutputPair) => {
        const withInputHandle = inputHandle ? `.${inputHandle}` : "";
        set({
          nodes: produce(get().nodes, (draftState) => {
            lodashSet(
              draftState[handleOutputPair.id].data,
              `${handleOutputPair.handle}${withInputHandle}`,
              data
            );
          }),
        });
      });
    },
    addEdge(connection) {
      if (
        typeof connection.source === "string" &&
        typeof connection.target === "string"
      ) {
        set({
          nodes: produce(get().nodes, (draftState) => {
            draftState[connection.source as string].outputs.add({
              id: connection.target as string,
              handle: connection.targetHandle as string,
            });
          }),
        });
      }
    },
  },
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("NodeData", useStore);
}
