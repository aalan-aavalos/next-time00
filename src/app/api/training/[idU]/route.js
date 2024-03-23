const { NextResponse } = require("next/server");
import Training from "@/models/training";
import { connectDB } from "@/utils/mongoose";

// Obtener un usuario
export async function GET(request, { params }) {
  try {
    connectDB();
    const trainingFound = await Training.findById(params.idU); // Busca por id


    if (!trainingFound) {
      return NextResponse.json(
        {
          message: "Periodo de training no encontrado",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(trainingFound);
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 });
  }
}

// Actualizar periodo de training
export async function PUT(request, { params }) {
  try {
    connectDB();
    const data = await request.json();
    const trainingUpdated = await Training.findByIdAndUpdate(params.idU, data, {
      new: true,
    });

    return NextResponse.json(trainingUpdated);
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 });
  }
}

// Eliminar periodo de training
export async function DELETE(request, { params }) {
  try {
    connectDB();
    const trainingDeleted = await Training.findByIdAndDelete(params.idU);
    if (!trainingDeleted) {
      return NextResponse.json(
        {
          message: "Periodo de training no encontrado",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(trainingDeleted);
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 });
  }
}
