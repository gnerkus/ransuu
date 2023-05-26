import {
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
  Connection,
} from "reactflow";
import { nanoid } from "nanoid";
import { create } from "zustand";
import { BaseEdge, BaseNode, BaseNodeDataType } from "@/types/nodes";
import dagInstance, { IDS, initDAG } from "@/svggraph/init";
import lodashSet from "lodash.set";
import { ChangeEvent } from "react";
import { DAGFunctions, Shape } from "@/svggraph/types";

const initSVG: Shape = {
  instance: [],
  path: [
    { command: "M", args: [0, 0] },
    { command: "H", args: [0 + 32] },
    { command: "V", args: [0 + 32] },
    { command: "H", args: [0] },
    { command: "z", args: [] },
  ],
  attributes: {
    fill: "#cc3399",
    stroke: "#ffffff",
  },
};

type OnChange<ChangesType> = (changes: ChangesType[]) => void;

export type FlowState = {
  sourceSVG: Shape;
  graphOutput: DAGFunctions;
  nodes: BaseNode[];
  edges: BaseEdge[];
  onNodesChange: OnChange<NodeChange>;
  onEdgesChange: OnChange<EdgeChange>;
  updateNode: (
    id: string,
    dataHandle: string,
    fieldPath: string,
    data: any
  ) => void;
  addEdge: (data: Connection) => void;
  handleNodeInput: (
    nodeId: string,
    dataHandle: string,
    inputHandle: string
  ) => (evt: ChangeEvent<HTMLInputElement>) => void;
};

export const useHandleNodeInput = () =>
  useStore((store: FlowState) => store.handleNodeInput);

export const useSourceSVG = () =>
  useStore((store: FlowState) => store.sourceSVG);

export const useGraphOutput = () =>
  useStore((store: FlowState) => store.graphOutput);

export const useStore = create<FlowState>((set, get) => ({
  graphOutput: initDAG,
  sourceSVG: initSVG,
  nodes: [
    {
      id: IDS.inputID,
      type: "svg_groupInputNode",
      position: {
        x: 100,
        y: 100,
      },
      data: {
        data: {},
      },
    },
    {
      id: IDS.outputID,
      type: "svg_groupOutputNode",
      position: {
        x: 500,
        y: 100,
      },
      data: {
        data: {},
      },
    },
    {
      id: IDS.initVectorID,
      type: "svg_vectorNode",
      position: {
        x: 300,
        y: 200,
      },
      data: {
        data: {
          x: 0,
          y: 0,
        },
      },
    },
    {
      id: IDS.initTransformID,
      type: "svg_transformNode",
      position: {
        x: 500,
        y: 200,
      },
      data: {
        externalInputs: {
          translate: true,
        },
        data: {
          translate: { x: 0, y: 0 },
          rotate: { angle: 0, centerX: 0, centerY: 0 },
          scale: { x: 1, y: 1 },
          skew: { x: 0, y: 0 },
        },
      },
    },
  ],
  edges: [
    {
      id: nanoid(6),
      source: IDS.inputID,
      target: IDS.initTransformID,
      sourceHandle: null,
      targetHandle: "path",
    },
    {
      id: nanoid(6),
      source: IDS.initVectorID,
      target: IDS.initTransformID,
      sourceHandle: null,
      targetHandle: "translate",
    },
    {
      id: nanoid(6),
      source: IDS.initTransformID,
      target: IDS.outputID,
      sourceHandle: "path",
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

  updateNode(id, dataHandle, fieldPath, data) {
    console.log("update data", id, dataHandle, fieldPath, data);
    const dataNode = dagInstance.getNode(id);
    if (!dataNode) return;

    dataNode.attrs = lodashSet(
      dataNode.attrs,
      [dataHandle || undefined, fieldPath].filter(Boolean).join("."),
      data
    );

    // solve the graph and update the store
    const output = dagInstance.solve().get(IDS.outputID) as DAGFunctions;
    set({
      graphOutput: output,
      nodes: get().nodes.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                data: lodashSet<BaseNodeDataType>(
                  node.data.data,
                  [dataHandle, fieldPath].filter(Boolean).join("."),
                  data
                ),
              },
            }
          : node
      ),
    });
  },

  handleNodeInput:
    (nodeId, dataHandle, inputHandle) => (evt: ChangeEvent<HTMLInputElement>) =>
      get().updateNode(nodeId, dataHandle, inputHandle, evt.target.value),

  addEdge(data) {
    if (!data.source || !data.target) return;

    const sourceNode = dagInstance.getNode(data.source);
    const targetNode = dagInstance.getNode(data.target);

    if (!(sourceNode && targetNode)) return;

    dagInstance.connect(sourceNode, targetNode, [data.targetHandle || ""]);

    const id = nanoid(6);
    const edge = {
      ...data,
      id,
      source: data.source || "",
      target: data.target || "",
    };

    // TODO: we should only create the edge if the connection was successful
    set({ edges: [edge, ...get().edges] });
    if (data.targetHandle) {
      const handle = data.targetHandle;
      set({
        nodes: get().nodes.map((node) =>
          node.id === data.target
            ? {
                ...node,
                data: {
                  ...node.data,
                  externalInputs: { [handle]: true },
                },
              }
            : node
        ),
      });
    }
  },
}));
