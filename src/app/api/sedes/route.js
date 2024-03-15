import Sede from "@/models/sede";
import { connectDB } from "@/utils/mongoose";
import { NextResponse } from "next/server";

// Obtener usuarios
export async function GET() {
  connectDB();
  const sedes = await Sede.find();
  return NextResponse.json(sedes);
}

// Agregar usuarios
export async function POST(request) {
  try {
    connectDB();
    const data = await request.json(); // Parsea los datos de la peticion
    const newSede = new Sede(data); // Crea un objeto
    const savedSede = await newSede.save(); // Guarda ese objeto en db

    return NextResponse.json(savedSede);
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 });
  }
}
