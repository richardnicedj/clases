import prisma from "lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(params.id) },
      include: { tasks: true },
    });

    if (!user) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener el usuario" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const { name, lastName, age, email, phone, isActive } = await req.json();

    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: { name, lastName, age, email, phone, isActive },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json({ error: "No se pudo actualizar el usuario" }, { status: 400 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.user.delete({ where: { id: Number(params.id) } });
    return NextResponse.json({ message: "Usuario eliminado correctamente" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "No se pudo eliminar el usuario" }, { status: 400 });
  }
}
