// src\app\api\turno\[idT]\route.js

import Turno from "@/models/turnos";
import { connectDB } from "@/utils/mongoose";
import { NextResponse } from "next/server";

// Obtener un turno por ID
export async function GET(request, { params }) {
  try {
    connectDB();
    const turno = await Turno.findById(params.idT);
    if (!turno) {
      return NextResponse.json({ message: "Turno no encontrado" }, { status: 404 });
    }
    return NextResponse.json(turno);
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 });
  }
}

// Actualizar un turno por ID
export async function PUT(request, { params }) {
  try {
    connectDB();
    const data = await request.json();
    const updatedTurno = await Turno.findByIdAndUpdate(params.idT, data, { new: true });
    return NextResponse.json(updatedTurno);
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 });
  }
}

// Eliminar un turno por ID
export async function DELETE(request, { params }) {
  try {
    connectDB();
    const deletedTurno = await Turno.findByIdAndDelete(params.idT);
    if (!deletedTurno) {
      return NextResponse.json({ message: "Turno no encontrado" }, { status: 404 });
    }
    return NextResponse.json(deletedTurno);
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 });
  }
}
