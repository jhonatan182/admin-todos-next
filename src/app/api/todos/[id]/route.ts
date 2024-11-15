import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

type Segments = {
  params: {
    id: string;
  };
};

const getTodo = async (id: string): Promise<Todo | null> => {
  const todo = await prisma.todo.findFirst({
    where: {
      id: id,
    },
  });

  return todo;
};

export async function GET(request: Request, { params }: Segments) {
  const todo = await getTodo(params.id);

  if (!todo) {
    return NextResponse.json(
      {
        message: `Todo with id ${params.id} not found`,
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json({
    todo: todo,
    id: params.id,
  });
}

const putSchema = z.object({
  complete: z.boolean().optional(),
  description: z.string().length(5).optional(),
});
export async function PUT(
  request: Request,
  { params }: { params: Promise<Segments["params"]> }
) {
  const paramsQuery = await params;

  const todo = await getTodo(paramsQuery.id);
  if (!todo) {
    return NextResponse.json(
      {
        message: `Todo with id ${paramsQuery.id} not found`,
      },
      {
        status: 404,
      }
    );
  }

  const { success, data } = putSchema.safeParse(await request.json());

  if (!success) {
    return NextResponse.json(
      {
        message: "Bad Request",
      },
      { status: 400 }
    );
  }

  const { complete, description } = data;

  const updatedTodo = await prisma.todo.update({
    where: { id: todo.id },
    data: {
      complete,
      description,
    },
  });

  return NextResponse.json(updatedTodo);
}
