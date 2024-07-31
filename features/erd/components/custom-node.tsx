import { TableColumn } from "@/features/erd/types";
import { Handle, Position } from "@xyflow/react";

interface CustomNodeProps {
  data: {
    label: string;
    columns: TableColumn[];
  };
}

export default function CustomNode({ data }: CustomNodeProps) {
  return (
    <div
      className="
      bg-white
      border
      border-gray-200
      rounded-md
      p-2
      w-72
      shadow-md
    "
    >
      <strong>{data.label}</strong>
      <hr />
      <div className="space-y-2">
        {data.columns.map((column) => (
          <div key={column.name}>
            <strong className="mr-2">{column.name}</strong>
            <span>{column.type}</span>
          </div>
        ))}
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="bg-white rounded-full shadow-md w-4 h-4"
      />
      <Handle
        type="target"
        position={Position.Left}
        className="bg-white rounded-full shadow-md w-4 h-4"
      />
    </div>
  );
}
