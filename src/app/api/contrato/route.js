import Contrato from "@/models/contratos";
import { connectDB } from "@/utils/mongoose";
import { NextResponse } from "next/server";

// Obtener usuarios
export async function GET() {
  connectDB();
  const contrato = await Contrato.find();
  return NextResponse.json(contrato);
}

// Agregar usuarios
export async function POST(request) {
  try {
    connectDB();
    const data = await request.json(); // Parsea los datos de la peticion
    const newContrato = new Contrato(data); // Crea un objeto
    const savedContrato = await newContrato.save(); // Guarda ese objeto en db

    return NextResponse.json(savedContrato);
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 });
  }
}
