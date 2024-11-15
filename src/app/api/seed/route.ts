import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  await prisma.todo.deleteMany({});

  const todo = await prisma.todo.createMany({
    data: [
      {
        description: "Piedra del alma",
        complete: true,
      },
      {
        description: "Piedra del tiempo",
      },
      {
        description: "Piedra del espacio",
      },
      {
        description: "Piedra de la realidad",
      },
      {
        description: "Piedra del poder",
      },
    ],
  });

  console.log(todo);

  return NextResponse.json({ message: "Seed Executed" }, { status: 200 });
}
