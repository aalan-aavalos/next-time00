const { NextResponse } = require("next/server");
import Areas from "@/models/areas";
import { connectDB } from "@/utils/mongoose";

// Obtener un usuario
export async function GET(request, { params }) {
  try {
    connectDB();
    const areaFound = await Areas.findById(params.idA); // Busca por id
    //const usrFound = await Usrs.findOne({ eNombre: params.idU }); // Busca por nombre

    if (!areaFound) {
      return NextResponse.json(
        {
          message: "Area no encontrado",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(areaFound);
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 });
  }
}

// Actualizar usuario
export async function PUT(request, { params }) {
  try {
    connectDB();
    const data = await request.json();
    const areasUpdated = await Areas.findByIdAndUpdate(params.idA, data, {
      new: true,
    });

    return NextResponse.json(areasUpdated);
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 });
  }
}

// Eliminar usuario
export async function DELETE(request, { params }) {
  try {
    connectDB();
    const areasDeleted = await Areas.findByIdAndDelete(params.idA);
    if (!areasDeleted) {
      return NextResponse.json(
        {
          message: "Area no encontrado",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(areasDeleted);
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 });
  }
}
