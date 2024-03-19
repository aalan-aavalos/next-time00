const { NextResponse } = require("next/server");
import Contrato from "@/models/contratos";
import { connectDB } from "@/utils/mongoose";

// Obtener un usuario
export async function GET(request, { params }) {
  try {
    connectDB();
    const contratoFound = await Contrato.findById(params.idU); // Busca por id
    //const usrFound = await Usrs.findOne({ eNombre: params.idU }); // Busca por nombre

    if (!contratoFound) {
      return NextResponse.json(
        {
          message: "Usuario no encontrado",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(contratoFound);
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 });
  }
}

// Actualizar usuario
export async function PUT(request, { params }) {
  try {
    connectDB();
    const data = await request.json();
    const contratoUpdated = await Contrato.findByIdAndUpdate(params.idU, data, {
      new: true,
    });

    return NextResponse.json(contratoUpdated);
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 });
  }
}

// Eliminar usuario
export async function DELETE(request, { params }) {
  try {
    connectDB();
    const contratoDeleted = await Contrato.findByIdAndDelete(params.idU);
    if (!contratoDeleted) {
      return NextResponse.json(
        {
          message: "Usuario no encontrado",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(contratoDeleted);
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 });
  }
}
