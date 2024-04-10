import Solicitudes from "@/models/solicitudes";
import { connectDB } from "@/utils/mongoose";
import { NextResponse } from "next/server";

// Obtener solicitudes
export async function GET() {
  try {
    connectDB();
    const solicitud = await Solicitudes.find();
    return NextResponse.json(solicitud);
  } catch (error) {
    console.log(error)
  }
}
