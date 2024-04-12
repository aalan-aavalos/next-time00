import Usrs from "@/models/usrs";
import { connectDB } from "@/utils/mongoose";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// Obtener usuarios
export async function GET() {
  connectDB();
  const usuarios = await Usrs.find();

  return NextResponse.json(usuarios, { message: "" });
}

// Agregar usuarios
export async function POST(req) {
  // Falta agregar la encriptacion de la contraseña
  try {
    connectDB();
    const data = await req.json(); // Parsea los datos de la peticion

    const passData = await bcrypt.hash(data.pwd, 12);

    data.pwd = passData;

    const newUsrs = new Usrs(data); // Crea un objeto
    const savedUsrs = await newUsrs.save(); // Guarda ese objeto en db

    return NextResponse.json(savedUsrs);
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 });
  }
}

export async function PUT(request) {
  try {
    connectDB();
    const data = await request.json();

    const usrsUpdated = await Usrs.updateOne(
      { eCorreo: data.eCorreo },
      { uTurno: data.uTurno }
    );
    // const usrsUpdated = await Usrs.findByIdAndUpdate(params.idU, data, {
    //   new: true,
    // });

    return NextResponse.json(usrsUpdated);
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 });
  }
}
