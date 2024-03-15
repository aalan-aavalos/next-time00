import Areas from "@/models/areas";
import { connectDB } from "@/utils/mongoose";
import { NextResponse } from "next/server";

// Obtener usuarios
export async function GET() {
  connectDB();
  const areas = await Areas.find();
  return NextResponse.json(areas);
}

// Agregar usuarios
export async function POST(request) {
  try {
    connectDB();
    const data = await request.json(); // Parsea los datos de la peticion
    const newAreas = new Areas(data); // Crea un objeto
    const savedAreas = await newAreas.save(); // Guarda ese objeto en db

    return NextResponse.json(savedAreas);
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 });
  }
}
