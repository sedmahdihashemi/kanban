"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GripVertical } from "lucide-react";
import * as React from "react";
import * as Kanban from "@/components/core/drag-and-drop";
import { OneTweetSimilarCard } from "@app/app/selected/MessagesOneTweet";

export interface Task {
  id: number;
  text: string;
}

const COLUMN_TITLES: Record<string, string> = {
  
  reject:"رد شده",
  done: "انجام شده",
};

export function KanbanDynamicOverlayDneOrReject({ selectedTweetComments,columns, setColumns }:{selectedTweetComments?:Task[],columns:Record<string, Task[]> , setColumns:any}) {

React.useEffect(()=>{
  setColumns({done:[],reject:[]})
},[selectedTweetComments])

console.log(columns);

  return (
    <Kanban.Root
      value={columns}
      onValueChange={setColumns}
      getItemValue={(item) => item.id}
      
    >
      <Kanban.Board className="grid  grid-cols-2 ">
        {Object.entries(columns).map(([columnValue, tasks]) => (
          <TaskColumn key={columnValue} value={columnValue} tasks={tasks} />
        ))}
      </Kanban.Board>
      <Kanban.Overlay>
        {({ value, variant }) => {
          if (variant === "column") {
            const tasks = columns[value] ?? [];

            return <TaskColumn value={value} tasks={tasks} />;
          }

          const task = Object.values(columns)
            .flat()
            .find((task) => task.id === value);

          if (!task) return null;

          return <TaskCard task={task} />;
        }}
      </Kanban.Overlay>
    </Kanban.Root>
  );
}

interface TaskCardProps
  extends Omit<React.ComponentProps<typeof Kanban.Item>, "value"> {
  task: Task;
}

function TaskCard({ task, ...props }: TaskCardProps) {

  return (
    <Kanban.Item key={task.id} value={task.id} asChild {...props} >
      
        
          <div className="flex items-center justify-between  ">
           <OneTweetSimilarCard
                             key={task.id}
                             defaultText={task.text}
                             
                             id={task.id}
                             />
            {/* <Badge
              variant={
                task.priority === "high"
                  ? "destructive"
                  : task.priority === "medium"
                  ? "default"
                  : "secondary"
              }
              className="pointer-events-none h-5 rounded-sm px-1.5 text-[11px] capitalize"
            >
              {task.priority}
            </Badge> */}
          </div>
          {/* <div className="flex items-center justify-between text-muted-foreground text-xs">
            {task.assignee && (
              <div className="flex items-center gap-1">
                <div className="size-2 rounded-full bg-primary/20" />
                <span className="line-clamp-1">{task.assignee}</span>
              </div>
            )}
            {task.dueDate && (
              <time className="text-[10px] tabular-nums">{task.dueDate}</time>
            )}
          </div> */}
       
    </Kanban.Item>
  );
}

interface TaskColumnProps
  extends Omit<React.ComponentProps<typeof Kanban.Column>, "children"> {
  tasks: Task[];
}

function TaskColumn({ value, tasks, ...props }: TaskColumnProps) {
  console.log(value);
  
  return (
    <Kanban.Column value={value} {...props}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm">{COLUMN_TITLES[value]}</span>
          <Badge variant="secondary" className="pointer-events-none rounded-sm">
            {tasks.length}
          </Badge>
        </div>
        <Kanban.ColumnHandle asChild>
          <Button variant="ghost" size="icon">
            <GripVertical className="h-4 w-4" />
          </Button>
        </Kanban.ColumnHandle>
      </div>
      
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} asHandle />
        ))}
      
    </Kanban.Column>
  );
}
