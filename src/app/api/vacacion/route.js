import Vacacion from "@/models/vacacion";
import Actividades from "@/models/actividades";
import Solicitudes from "@/models/solicitudes";
import { connectDB } from "@/utils/mongoose";
import { NextResponse } from "next/server";

// Obtener usuarios
export async function GET() {
  connectDB();
  const vacaciones = await Vacacion.find();
  return NextResponse.json(vacaciones);
}

// Agregar usuarios
export async function POST(request) {
  try {
    connectDB();
    const data = await request.json(); // Parsea los datos de la peticion

    const newVacacion = new Vacacion(data); // Crea un objeto
    const newActividad = new Actividades(data);
    
    data.tipo = "Vacacion"
    const newSolicitud = new Solicitudes(data);


    const savedVacacion = await newVacacion.save(); // Guarda ese objeto en db
    await newActividad.save();
    await newSolicitud.save();

    return NextResponse.json(savedVacacion);
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 });
  }
}
