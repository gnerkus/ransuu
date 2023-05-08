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
import {
  addNode,
  createDefaultNodes,
  updateNode,
  getOutput,
} from "@/context/SVGContext";
import lodashSet from "lodash.set";
import { ChangeEvent } from "react";

type OnChange<ChangesType> = (changes: ChangesType[]) => void;

export type FlowState = {
  output: string;
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

const inputNodeId = nanoid(6);
const outputNodeId = nanoid(6);
const vectorNodeId = nanoid(6);
const transformNodeId = nanoid(6);

createDefaultNodes(inputNodeId, outputNodeId, vectorNodeId, transformNodeId);

export const useHandleNodeInput = () =>
  useStore((store: FlowState) => store.handleNodeInput);

export const useStore = create<FlowState>((set, get) => ({
  output: getOutput(),
  nodes: [
    {
      id: inputNodeId,
      type: "svg_groupInputNode",
      position: {
        x: 100,
        y: 100,
      },
      data: {
        // TODO: remove the redundant 'path' field
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
      id: outputNodeId,
      type: "svg_groupOutputNode",
      position: {
        x: 500,
        y: 100,
      },
      data: {
        // TODO: remove the redundant 'path' field
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
      id: vectorNodeId,
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
      id: transformNodeId,
      type: "svg_transformNode",
      position: {
        x: 500,
        y: 200,
      },
      data: {
        // TODO: remove the redundant 'path' field
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
      source: inputNodeId,
      target: outputNodeId,
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

  updateNode(id, dataHandle, fieldPath, data) {
    // TODO: check if `updateNode` is actually synchronous
    updateNode(id, fieldPath, data);
    set({
      nodes: get().nodes.map((node) =>
        node.id === id
          ? {
              ...node,
              data: lodashSet(node.data, `${dataHandle}.${fieldPath}`, data),
            }
          : node
      ),
    });
    set({
      output: getOutput(),
    });
  },

  handleNodeInput:
    (nodeId, dataHandle, inputHandle) => (evt: ChangeEvent<HTMLInputElement>) =>
      get().updateNode(nodeId, dataHandle, inputHandle, evt.target.value),

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
