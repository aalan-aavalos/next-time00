const { NextResponse } = require("next/server");
import Vacacion from "@/models/vacacion";
import { connectDB } from "@/utils/mongoose";

// Obtener un usuario
export async function GET(request, { params }) {
  try {
    connectDB();
    const vacacionFound = await Vacacion.findById(params.idU); // Busca por id
    //const usrFound = await Usrs.findOne({ eNombre: params.idU }); // Busca por nombre

    if (!vacacionFound) {
      return NextResponse.json(
        {
          message: "Solicitud no encontrada",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(vacacionFound);
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 });
  }
}

// Actualizar usuario
export async function PUT(request, { params }) {
  try {
    connectDB();
    const data = await request.json();
    const vacacionUpdated = await Vacacion.findByIdAndUpdate(params.idU, data, {
      new: true,
    });

    return NextResponse.json(vacacionUpdated);
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 });
  }
}

// Eliminar usuario
export async function DELETE(request, { params }) {
  try {
    connectDB();
    const vacacionDeleted = await Vacacion.findByIdAndDelete(params.idU);
    if (!vacacionDeleted) {
      return NextResponse.json(
        {
          message: "Solicitud no econtrada",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(vacacionDeleted);
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 });
  }
}
