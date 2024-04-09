// src\app\api\turno\route.js

import Turno from "@/models/turnos";
import { connectDB } from "@/utils/mongoose";
import { NextResponse } from "next/server";
import Solicitudes from "@/models/solicitudes";

// Obtener todos los turnos
export async function GET() {
  connectDB();
  const turnos = await Turno.find();
  return NextResponse.json(turnos);
}

// Crear un nuevo turno
export async function POST(request) {
  try {
    connectDB();
    const data = await request.json();
    const newTurno = new Turno(data);
    const newSolicitud = new Solicitudes(data);
    const savedTurno = await newTurno.save();
    await newSolicitud.save();
    return NextResponse.json(savedTurno);
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 });
  }
}
