import { Resend } from "resend";
import { EmailTemplate } from "@/components/forms/email-template";
import { NextResponse } from "next/server";

const resend = new Resend("re_Bt93S8qi_Haew4bsY6io7cnnpBQEaQpRx");

export async function POST(request) {
  const dataReq = await request.json();

  const { data, error } = await resend.emails.send({
    from: "NextTime <onboarding@resend.dev>",
    to: dataReq.eCorreo,
    subject: "Confirmación de vacaciones",
    react: EmailTemplate({
      firstName: dataReq.eNombre,
      description: `Se a añadido un nuevo periodo de training: ${dataReq.motivo}, 
                    Intervalo de fechas: ${dataReq.fechaI} - ${dataReq.fechaF}, 
                    estado: ${dataReq.estado}`,
    }),
  });

  if (error) {
    return NextResponse.json(error, { status: 400 });
  }
  return NextResponse.json(data, { status: 200 });
}
