const { NextResponse } = require("next/server");
import Actividades from "@/models/actividades";
import { connectDB } from "@/utils/mongoose";

export async function GET() {
  connectDB();
  const actividad = await Actividades.aggregate([
    {
      $facet: {
        documentosConValores: [
          {
            $match: {
              $or: [
                { $expr: { $gt: [{ $size: "$Administradores" }, 0] } },
                { $expr: { $gt: [{ $size: "$Empleados" }, 0] } },
                { $expr: { $gt: [{ $size: "$eCorreo" }, 0] } },
              ],
            },
          },
          {
            $unwind: "$eCorreo",
          },
        ],
        documentosSinValores: [
          {
            $match: {
              $and: [
                { Administradores: { $size: 0 } },
                { Empleados: { $size: 0 } },
                { eCorreo: { $size: 0 } },
              ],
            },
          },
        ],
      },
    },
    {
      $project: {
        todosLosDocumentos: {
          $concatArrays: ["$documentosConValores", "$documentosSinValores"],
        },
      },
    },
    {
      $unwind: "$todosLosDocumentos",
    },
    {
      $replaceRoot: { newRoot: "$todosLosDocumentos" },
    },
  ]);

  return NextResponse.json(actividad);
}

export async function POST(request) {
  try {
    connectDB();
    const data = await request.json(); // Parsea los datos de la peticion

    const newActivity = new Actividades(data);

    const savedActivity = await newActivity.save(); // Guarda ese objeto en db

    return NextResponse.json(savedActivity);
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 });
  }
}
