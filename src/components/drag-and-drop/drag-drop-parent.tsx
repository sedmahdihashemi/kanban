"use client";

import * as React from "react";
import * as Kanban from "@/components/core/drag-and-drop";
import KanbanLeft from "./KanbanLeft";
import KanbanRight from "./KanbanRight";

export interface Task {
  id: number;
  text: string;
}

export default function KanbanBoard({
  selectedTweetComments,
}: {
  selectedTweetComments: Task[];
}) {
  const [columns, setColumns] = React.useState<Record<string, Task[]>>({
    backlog: [...selectedTweetComments],
    inProgress: [],
    done: [],
  });

  // React.useEffect(()=>{
  //   setColumns({backlog:selectedTweetComments})
  // },[selectedTweetComments])
  return (
    <Kanban.Root
      value={columns}
      onValueChange={setColumns}
      getItemValue={(item) => item.id}
    >
      <div className="flex flex-col gap-4 w-full">
        <KanbanLeft columns={columns} />
        <KanbanRight columns={columns} />
      </div>
    </Kanban.Root>
  );
}
