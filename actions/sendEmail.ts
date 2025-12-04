"use server";

import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

// Form şeması (Validasyon kuralları)
const formSchema = z.object({
  senderEmail: z.string().email("Geçersiz e-posta adresi."),
  message: z.string().min(1, "Mesaj boş olamaz.").max(500, "Mesaj çok uzun."),
});

export const sendEmail = async (formData: FormData) => {
  const senderEmail = formData.get("senderEmail");
  const message = formData.get("message");

  // Server-side validasyon
  const validatedFields = formSchema.safeParse({
    senderEmail,
    message,
  });

  if (!validatedFields.success) {
    return {
      error: "Lütfen alanları kontrol ediniz.",
    };
  }

  try {
    // Maili gönderme işlemi
    await resend.emails.send({
      from: "Portfolio Contact Form <onboarding@resend.dev>", // Resend'in varsayılanı
      to: "ahmetcanli1943@gmail.com", // SENİN MAİL ADRESİN
      subject: "Portfolyodan Yeni Mesaj Var!",
      replyTo: senderEmail as string,
      text: `Gönderen: ${senderEmail}\n\nMesaj:\n${message}`,
    });

    return { success: true };
  } catch (error) {
    return {
      error: "Bir hata oluştu, lütfen daha sonra tekrar deneyin.",
    };
  }
};