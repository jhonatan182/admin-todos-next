"use client";

import { Todo } from "@prisma/client";
import { TodoItem } from "./TodoItem";
// import * as api from "@/todos/helpers/todos";
// import { useRouter } from "next/navigation";
import { toggleTodo } from "../actions/todo-action";

type TodosGridProps = {
  todos?: Todo[];
};

export function TodosGrid({ todos = [] }: TodosGridProps) {
  // const router = useRouter();

  // const toogleTodo = async (id: string, complete: boolean) => {
  //   await api.updateTodo(id, complete);

  //   router.refresh();
  // };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toogleTodo={toggleTodo} />
      ))}
    </div>
  );
}
