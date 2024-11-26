import { auth } from "@/app/auth.config";
import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Listado de TODOS",
  description: "Listado de TODOS",
};

export default async function RestTodosPage() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  const todos = await prisma.todo.findMany({
    orderBy: {
      description: "asc",
    },
    where: {
      user: {
        id: session.user.id,
      },
    },
  });

  return (
    <div>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo />
      </div>

      <TodosGrid todos={todos} />
    </div>
  );
}
