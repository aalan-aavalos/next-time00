import { Resend } from "resend";
import { EmailTemplate } from "@/components/forms/email-template";
import { NextResponse } from "next/server";

const resend = new Resend("re_APQ8h7RB_CuqSV4Aqyrg2XPntE4V9FaW9");

export async function POST(request) {
  const dataReq = await request.json();

  const { data, error } = await resend.emails.send({
    from: "NextTime <confirmations@nexttime.website>",
    to: dataReq.eCorreo,
    subject: "Nuevo periodo de Training asignado!",
    react: EmailTemplate({
      firstName: "Administradores y empleados!",
      description: `Se a añadido un nuevo periodo de training: ${dataReq.nombre},
                    con el motivo de ${dataReq.motivo} con el
                    intervalo de fechas: ${dataReq.fechaI} - ${dataReq.fechaF}.
                    Los administradores encargados son: ${dataReq.Administradores}`
    }),
  });

  if (error) {
    return NextResponse.json(error, { status: 400 });
  }
  return NextResponse.json(data, { status: 200 });
}
