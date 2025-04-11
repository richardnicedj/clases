import prisma from "lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const tasks = await prisma.task.findMany({
      where: { userId: Number(id) },
    });

    if (!tasks) return NextResponse.json({ error: "Task no found" }, { status: 404 });

    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error to find task" }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const { title } = await req.json();

    if (!title) {
      return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 });
    }

    const task = await prisma.task.create({
      data: { title, userId: Number(id) },
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}