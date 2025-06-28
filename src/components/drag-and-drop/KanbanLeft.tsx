"use client";

import * as Kanban from "@/components/core/drag-and-drop";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GripVertical } from "lucide-react";
import { Task } from "./drag-and-drop-done-reject";
import TaskCard from "./TaskCard";

interface Props {
  columns: Record<string, Task[]>;
}

export default function KanbanLeft({ columns }: Props) {
  const tasks = columns.backlog || [];

  return (
    <Kanban.Board>
      <Kanban.Column value="backlog" className="max-h-96 overflow-y-scroll">
        <div className="flex items-center justify-between mb-2 ">
          <span className="font-semibold text-sm">در حال بررسی</span>
          <Kanban.ColumnHandle asChild>
            {/* <Button variant="ghost" size="icon">
              <GripVertical className="h-4 w-4" />
            </Button> */}
          </Kanban.ColumnHandle>
        </div>
        <div className="flex flex-col gap-2">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} asHandle />
          ))}
        </div>
      </Kanban.Column>
    </Kanban.Board>
  );
}
