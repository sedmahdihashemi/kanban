"use client";

import * as Kanban from "@/components/core/drag-and-drop";
import { Badge } from "@/components/ui/badge";
import { Task } from "./drag-and-drop-done-reject";
import { OneTweetSimilarCard } from "@app/app/selected/MessagesOneTweet";

export default function TaskCard({ task, ...props }: { task: Task } & any) {
  return (
    <Kanban.Item value={task.id} asChild {...props}>
      <div className="flex items-center justify-between  ">
        <OneTweetSimilarCard
          key={task.id}
          defaultText={task.text}
          id={task.id}
        />
      </div>
    </Kanban.Item>
  );
}
