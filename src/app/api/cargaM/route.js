import { NextResponse } from "next/server";
import fs from 'fs';
import { promisify } from 'util';
import Usrs from '@/models/usrs';
import { connectDB } from '@/utils/mongoose';
import bcrypt from 'bcryptjs';

const readFileAsync = promisify(fs.readFile);

// Función para leer el archivo JSON
async function readJSONFile(filePath) {
  try {
    const data = await readFileAsync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    throw new Error(`Error reading JSON file: ${error.message}`);
  }
}

// Función para insertar usuarios desde un archivo JSON
export async function insertUsersFromJSON(filePath) {
  try {
    connectDB();
    const jsonData = await readJSONFile(filePath);

    const usersToInsert = jsonData.users.map(async (userData) => {
      const hashedPassword = await bcrypt.hash(userData.pwd, 12);
      userData.pwd = hashedPassword;
      // Mapea los nombres de los campos al modelo Usrs
      const newUser = new Usrs({
        eNombre: userData.eNombre,
        eApeP: userData.eApeP,
        eApeM: userData.eApeM,
        eRol: userData.eRol,
        eEdad: userData.eEdad,
        eNumero: userData.eNumero,
        eCorreo: userData.eCorreo,
        auSede: userData.auSede,
        uArea: userData.uArea,
        uTurno: userData.uTurno,
        pwd: userData.pwd
      });
      return newUser.save();
    });

    const insertedUsers = await Promise.all(usersToInsert);

    return insertedUsers;
  } catch (error) {
    throw new Error(`Error inserting users from JSON: ${error.message}`);
  }
}

// Endpoint para insertar usuarios desde un archivo JSON
export async function POST(req) {
  try {
    const { filePath } = await req.json(); // Se espera que la solicitud contenga la ruta del archivo JSON
    const insertedUsers = await insertUsersFromJSON(filePath);
    return NextResponse.json(insertedUsers);
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 });
  }
}
