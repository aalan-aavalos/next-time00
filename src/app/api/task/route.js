import { NextResponse } from "next/server";

export function GET(){
    return NextResponse.json("Obteniendo tareas")
}

export function POST(){
    return NextResponse.json("Creando tareas")
}