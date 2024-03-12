import { connectDB } from "@/utils/mongoose";
import { NextResponse } from "next/server";

export function GET() {
  connectDB()
  return NextResponse.json({ message: "Obteniendo tareas" });
}

export function POST() {
  return NextResponse.json({ message: "Creando tareas" });
}
