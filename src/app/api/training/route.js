import { connectDB } from "@/utils/mongoose";
import { NextResponse } from "next/server";
import Training from "@/models/training";

// Obtener usuarios
export async function GET() {
  connectDB();
  const training = await Training.find();
  return NextResponse.json(training);
}

// Agregar Trainings
export async function POST(request) {
  try {
    connectDB();
    const data = await request.json(); // Parsea los datos de la peticion

    // Verificar los datos recibidos e imprimirlos en la consola
    console.log("Datos recibidos:", data);

    const newTraining = new Training(data); // Crea un objeto
    const savedTraining = await newTraining.save(); // Guarda ese objeto en db

    return NextResponse.json(savedTraining);
  } catch (error) {
    // Imprimir mensaje de error en la consola
    console.error("Error al guardar el entrenamiento:", error);

    // Devolver el mensaje de error como respuesta
    return NextResponse.json(error.message, { status: 400 });
  }
}