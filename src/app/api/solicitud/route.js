// import Solicitudes from "@/models/solicitudes";
// import { connectDB } from "@/utils/mongoose";
// import { NextResponse } from "next/server";

// // Obtener solicitudes
// export async function GET() {
//   connectDB();
//   const solicitud = await Solicitudes.find();
//   return NextResponse.json(solicitud);
// }

import Vacacion from "@/models/vacacion";

import Solicitudes from "@/models/solicitudes";
import { connectDB } from "@/utils/mongoose";
import { NextResponse } from "next/server";

// Obtener usuarios
export async function GET() {
  connectDB();
  const vacaciones = await Vacacion.find();
  return NextResponse.json(vacaciones);
}