import Solicitudes from "@/models/turnos";
import { connectDB } from "@/utils/mongoose";
import { NextResponse } from "next/server";

// Obtener solicitudes
export async function GET() {
  connectDB();
  const solicitud = await Solicitudes.find();
  return NextResponse.json(solicitud);
}