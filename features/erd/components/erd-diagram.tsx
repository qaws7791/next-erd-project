"use client";
import CustomNode from "@/features/erd/components/custom-node";
import database from "@/features/erd/mock.json";
import { ForeignKeyConstraint, Table } from "@/features/erd/types";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Connection,
  Controls,
  Edge,
  EdgeChange,
  EdgeTypes,
  MiniMap,
  Node,
  NodeChange,
  NodeTypes,
  ReactFlow,
} from "@xyflow/react";
import { useCallback, useEffect, useState } from "react";
import "@xyflow/react/dist/style.css";
import CustomEdge from "@/features/erd/components/custom-edge";

export default function ErdDiagram() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    const initialNodes: Node[] = database.tables.map(
      (table: Table, index: number) => ({
        id: table.name,
        type: "customNode",
        data: {
          label: table.name,
          columns: table.columns,
        },
        position: { x: 250 * index, y: 50 },
      })
    );

    // 엣지 생성
    const initialEdges: Edge[] = database.constraints.map(
      (constraint: ForeignKeyConstraint, index: number) => ({
        id: `e${index}`,
        source: constraint.table,
        target: constraint.foreignTable,
        animated: true,
        label: `${constraint.column} -> ${constraint.foreignColumn}`,
        type: "custom",
      })
    );

    setNodes(initialNodes);
    setEdges(initialEdges);
  }, []);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );
  const nodeTypes: NodeTypes = { customNode: CustomNode };
  const edgeTypes: EdgeTypes = {
    custom: CustomEdge,
  };

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      fitView
      className="w-full h-full bg-teal-50"
    >
      <MiniMap />
      <Controls />
      <Background />
    </ReactFlow>
  );
}
