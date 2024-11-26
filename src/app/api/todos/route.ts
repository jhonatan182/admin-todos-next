import { auth } from "@/app/auth.config";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const take = Number(searchParams.get("take") ?? "10");
  const skip = Number(searchParams.get("skip") ?? "0");

  if (isNaN(take)) {
    return NextResponse.json(
      {
        message: "Take tiene ser un numero",
      },
      {
        status: 400,
      }
    );
  }

  if (isNaN(skip)) {
    return NextResponse.json(
      {
        message: "Skip tiene ser un numero",
      },
      {
        status: 400,
      }
    );
  }

  const todos = await prisma.todo.findMany({
    take,
    skip,
  });

  return NextResponse.json(todos, { status: 200 });
}

const todoSchema = z.object({
  description: z.string({ required_error: "La descripcion es obligatoria" }),
  complete: z.boolean().optional().default(false),
});

export async function POST(request: Request) {
  const session = await auth();

  if (!session) {
    return NextResponse.json(
      {
        message: "No estas autenticado",
      },
      {
        status: 401,
      }
    );
  }

  const { success, data } = todoSchema.safeParse(await request.json());

  if (!success) {
    return NextResponse.json(
      {
        message: "Bad Request",
      },
      { status: 400 }
    );
  }

  const todo = await prisma.todo.create({
    data: { ...data, userId: session.user.id },
  });

  return NextResponse.json(todo);
}

export async function DELETE() {
  const session = await auth();

  if (!session) {
    return NextResponse.json(
      {
        message: "No estas autenticado",
      },
      {
        status: 401,
      }
    );
  }

  await prisma.todo.deleteMany({
    where: {
      complete: true,
      userId: session.user.id,
    },
  });

  return NextResponse.json(
    {
      msg: "TODOS eliminados",
    },
    {
      status: 200,
    }
  );
}
