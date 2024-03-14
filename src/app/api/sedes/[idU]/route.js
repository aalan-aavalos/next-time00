const { NextResponse } = require("next/server");
import Sede from "@/models/sede";
import { connectDB } from "@/utils/mongoose";

// Obtener un usuario
export async function GET(request, { params }) {
  try {
    connectDB();
    const sedeFound = await Sede.findById(params.idU); // Busca por id
    //const usrFound = await Usrs.findOne({ eNombre: params.idU }); // Busca por nombre

    if (!sedeFound) {
      return NextResponse.json(
        {
          message: "Sede  no encontrado",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(sedeFound);
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 });
  }
}

// Actualizar usuario
export async function PUT(request, { params }) {
  try {
    connectDB();
    const data = await request.json();
    const sedeUpdated = await Sede.findByIdAndUpdate(params.idU, data, {
      new: true,
    });

    return NextResponse.json(sedeUpdated);
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 });
  }
}

// Eliminar usuario
export async function DELETE(request, { params }) {
  try {
    connectDB();
    const sedeDeleted = await Sede.findByIdAndDelete(params.idU);
    if (!sedeDeleted) {
      return NextResponse.json(
        {
          message: "Usuario no encontrado",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(sedeDeleted);
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 });
  }
}
