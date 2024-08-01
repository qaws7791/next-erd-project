import { TableColumn } from "@/features/erd/types";
import { Handle, NodeProps, Position } from "@xyflow/react";

interface CustomNodeProps extends NodeProps {
  data: {
    label: string;
    columns: TableColumn[];
  };
}

export default function CustomNode({ data }: CustomNodeProps) {
  return (
    <div
      className="bg-white
      border
      border-gray-200
      rounded-md
      p-2
      w-72
      shadow-md"
    >
      <div className="font-bold mb-3">{data.label}</div>
      {data.columns.map((col, index) => {
        return (
          <div key={index} className="flex justify-between relative px-2">
            <span>{col.name}</span>
            <Handle
              type="source"
              position={Position.Right}
              id={`${data.label}-${col.name}`}
              className={`bg-neutral-400 rounded-full shadow-md w-4 h-4 top-1/2 translate-x-full -translate-y-1/2`}
            />
            <Handle
              type="target"
              position={Position.Left}
              id={`${data.label}-${col.name}`}
              className="bg-neutral-400 rounded-full shadow-md w-4 h-4 top-1/2 -translate-x-full -translate-y-1/2"
            />
          </div>
        );
      })}
    </div>
  );
}
