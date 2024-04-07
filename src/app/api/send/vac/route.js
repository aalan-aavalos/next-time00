import { Resend } from "resend";
import { EmailTemplate } from "@/components/forms/email-template";
import { NextResponse } from "next/server";

const resend = new Resend("re_APQ8h7RB_CuqSV4Aqyrg2XPntE4V9FaW9");

export async function POST(request) {
  const dataReq = await request.json();
  
  const { data, error } = await resend.emails.send({
    from: "NextTime <confirmations@nexttime.website>",
    to: [dataReq.eCorreo],
    subject: "Se a resistrado una nueva solicitud  de vacaciones",
    react: EmailTemplate({ firstName: dataReq.eNombre, description: `Motivo de las vacaciones: ${dataReq.motivo}, Intervalo de fechas: ${dataReq.fechaI} - ${dataReq.fechaF}, estado: ${dataReq.estado}`}),
  });

  if (error) {
    return NextResponse.json(error, { status: 400 });
  }
  return NextResponse.json(data, { status: 200 });
}
