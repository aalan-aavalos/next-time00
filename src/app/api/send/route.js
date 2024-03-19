import { Resend } from "resend";
import { EmailTemplate } from "@/components/email-template";
import { NextResponse } from "next/server";

const resend = new Resend("re_Bt93S8qi_Haew4bsY6io7cnnpBQEaQpRx");

export async function POST() {
  const { data, error } = await resend.emails.send({
    from: "NextTime <onboarding@resend.dev>",
    to: ["avalosalan789@gmail.com"],
    subject: "No es un virus",
    react: EmailTemplate({ firstName: "Josue" }),
  });

  if (error) {
    return NextResponse.json(error, { status: 400 });
  }
  return NextResponse.json(data, { status: 200 });
}
