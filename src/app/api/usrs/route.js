import Usrs from "@/models/usrs";
import { connectDB } from "@/utils/mongoose";
import { NextResponse } from "next/server";

// Obtener usuarios
export async function GET() {
  connectDB();
  const usuarios = await Usrs.find();
  return NextResponse.json(usuarios);
}

// Agregar usuarios
export async function POST(request) {
  try {
    connectDB();
    const data = await request.json(); // Parsea los datos de la peticion
    const newUsrs = new Usrs(data); // Crea un objeto
    const savedUsrs = await newUsrs.save(); // Guarda ese objeto en db

    return NextResponse.json(savedUsrs);
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 });
  }
}
