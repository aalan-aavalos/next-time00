const { NextResponse } = require("next/server");
import Solicitudes from "@/models/solicitudes";
import Actividades from "@/models/actividades";
import { connectDB } from "@/utils/mongoose";

// Obtener un usuario
export async function GET(request, { params }) {
  try {
    connectDB();
    const solicitudFound = await Solicitudes.findById(params.idU); // Busca por id
    //const usrFound = await Usrs.findOne({ eNombre: params.idU }); // Busca por nombre

    if (!solicitudFound) {
      return NextResponse.json(
        {
          message: "Solicitud no encontrada",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(solicitudFound);
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 });
  }
}

// Actualizar usuario
export async function PUT(request, { params }) {
  try {
    connectDB();
    const data = await request.json();
    console.log(request, params);

    if (data.estado !== "Rechazada") {
      if (data.tipo === "vacacion") {
        const newActividad = new Actividades(data);
        const actvitySave = await newActividad.save();
        console.log(actvitySave);
      }

      const activitFound = await Actividades.findOne({
        eCorreo: data.eCorreo,
        tipo: "turno",
      });

      if (!activitFound) {
        const newActividad = new Actividades(data);
        const actvitySave = await newActividad.save();
        console.log(actvitySave);
      } else {
        const actividadUpdated = await Actividades.updateOne(
          { eCorreo: data.eCorreo, tipo: "turno" },
          {
            turno: data.turno,
          }
        );
        console.log(actividadUpdated);
      }
    }

    const solicitudUpdated = await Solicitudes.findByIdAndUpdate(
      params.idU,
      data,
      {
        new: true,
      }
    );

    return NextResponse.json(solicitudUpdated);
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 });
  }
}

// Eliminar usuario
export async function DELETE(request, { params }) {
  try {
    connectDB();
    const solicitudDeleted = await Solicitudes.findByIdAndDelete(params.idU);
    if (!solicitudDeleted) {
      return NextResponse.json(
        {
          message: "Solicitud no econtrada",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(solicitudDeleted);
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 });
  }
}
