import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET() {
  await prisma.todo.deleteMany({});
  await prisma.user.deleteMany({});

  await prisma.user.create({
    data: {
      email: "test1@google.com",
      password: bcrypt.hashSync("123456", 10),
      name: "test",
      image: "test",
      roles: ["admin", "client", "super-admin"],
      todos: {
        create: [
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
      },
    },
  });

  return NextResponse.json({ message: "Seed Executed" }, { status: 200 });
}
