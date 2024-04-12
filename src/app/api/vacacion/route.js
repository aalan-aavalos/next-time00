import Vacacion from "@/models/vacacion";
import Training from "@/models/training";
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
// Agregar usuarios
export async function POST(request) {
  try {
    connectDB();
    const requestData = await request.json(); // Parsea los datos de la petición

    // Buscar si alguna solicitud de vacaciones entra en el rango de fechas de algún entrenamiento
    const training = await Training.findOne({
      eCorreo: requestData.eCorreo, // Busca si el correo de la solicitud está en el arreglo de correos de entrenamiento
      fechaI: { $lte: requestData.fechaF }, // La fecha de inicio del entrenamiento debe ser menor o igual a la fecha final de la solicitud
      fechaF: { $gte: requestData.fechaI }, // La fecha de fin del entrenamiento debe ser mayor o igual a la fecha de inicio de la solicitud
    });

    if (training) {
      return NextResponse.json({ message: "No se puede" }, { status: 400 });
    } else {
      // Si no hay coincidencias, crear y guardar la solicitud de vacaciones
      const newVacacion = new Vacacion(requestData);
      const newSolicitud = new Solicitudes(requestData);
      const savedVacacion = await newVacacion.save();
      await newSolicitud.save();

      return NextResponse.json(savedVacacion);
    }
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 });
  }
}
