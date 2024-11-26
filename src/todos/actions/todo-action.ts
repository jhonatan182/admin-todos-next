"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { auth } from "@/app/auth.config";

export const toggleTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  const todo = await prisma.todo.findFirst({ where: { id } });

  if (!todo) throw "TODO no encontrado";

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { complete },
  });

  revalidatePath("/dashboard/server-todos");

  return updatedTodo;
};

export const addTodo = async (description: string) => {
  try {
    const session = await auth();

    const todo = await prisma.todo.create({
      data: {
        description,
        userId: session!.user.id,
      },
    });
    revalidatePath("/dashboard/server-todos");

    return todo;
  } catch (error) {
    console.log(error);

    return {
      message: "Error creando todo",
    };
  }
};

export const deleteCompleted = async (): Promise<void> => {
  await prisma.todo.deleteMany({
    where: { complete: true },
  });

  revalidatePath("/dashboard/server-todos");
};
