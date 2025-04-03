import prisma from "lib/prisma";
import { NextResponse } from "next/server";

// Obtener todos los usuarios
export async function GET() {
  try {
    const users = await prisma.user.findMany({ include: { tasks: true } }); // Incluye tareas si es necesario
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener los usuarios" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, lastName, age, email, phone, isActive } = await req.json();
    const user = await prisma.user.create({
      data: { name, lastName, age, email, phone, isActive },
    });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "El email ya está registrado o datos inválidos" }, { status: 400 });
  }
}