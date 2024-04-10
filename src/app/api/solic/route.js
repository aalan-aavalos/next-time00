import Solicitudes from "@/models/solicitudes";
import { connectDB } from "@/utils/mongoose";
import { NextResponse } from "next/server";

// Obtener usuarios
export async function GET() {
  connectDB();
  const soloicitud = await Solicitudes.find();
  return NextResponse.json(soloicitud);
}

// Agregar usuarios
export async function POST(request) {
  try {
    connectDB();
    const data = await request.json(); // Parsea los datos de la peticion

    const newSolicitud = new Solicitudes(data);

    const savedSolicitud = await newSolicitud.save(); // Guarda ese objeto en db

    return NextResponse.json(savedSolicitud);
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 });
  }
}
