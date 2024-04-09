import Usrs from "@/models/usrs";
import { connectDB } from "@/utils/mongoose";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// Agregar usuarios
export async function POST(req) {
  // Falta agregar la encriptacion de la contraseña
  try {
    connectDB();
    const data = await req.json(); // Parsea los datos de la peticion
    data.forEach(async (dat) => {
      const newUsrs = new Usrs(dat); // Crea un objeto
      await newUsrs.save(); // Guarda ese objeto en db
    });
    console.log("etsito");
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 });
  }
}
