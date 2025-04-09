import prisma from "lib/prisma";
import { NextResponse } from "next/server";

// Obtener todos los usuarios
export async function GET() {
  try {
    const users = await prisma.user.findMany({ include: { tasks: true } });
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener los usuarios" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, lastName, age, email, phone, isActive } = await req.json();

    // Validaciones
    if (!name || !lastName || !age || !email || !phone) {
      return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 });
    }

    if (isNaN(age) || age <= 0) {
      return NextResponse.json({ error: "La edad debe ser un número válido" }, { status: 400 });
    }

    // Verificar si el email ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "El email ya está registrado" }, { status: 400 });
    }

    // Crear el usuario
    const user = await prisma.user.create({
      data: { name, lastName, age: Number(age), email, phone, isActive },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
