"use client";

import * as Kanban from "@/components/core/drag-and-drop";
import { Button } from "@/components/ui/button";
import { GripVertical } from "lucide-react";
import { Task } from "./drag-and-drop-done-reject";
import TaskCard from "./TaskCard";

interface Props {
  columns: Record<string, Task[]>;
}

export default function KanbanRight({ columns }: Props) {
  return (
    <Kanban.Board className="grid grid-cols-2 gap-4">
      {["inProgress", "done"].map((column) => (
        <Kanban.Column key={column} value={column}>
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-sm">
              {column === "inProgress" ? "رد شده" : "تایید"}
            </span>
            <Kanban.ColumnHandle asChild>
              <Button variant="ghost" size="icon">
                <GripVertical className="h-4 w-4" />
              </Button>
            </Kanban.ColumnHandle>
          </div>
          <div className="flex flex-col gap-2">
            {(columns[column] || []).map((task) => (
              <TaskCard key={task.id} task={task} asHandle />
            ))}
          </div>
        </Kanban.Column>
      ))}
    </Kanban.Board>
  );
}
