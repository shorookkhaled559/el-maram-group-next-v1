import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getDb } from "@/lib/mongodb";
import ContactEmail from "@/emails/ContactEmail";

const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[\d\s\-\+\(\)]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = (body?.name || "").trim();
    const email = (body?.email || "").trim().toLowerCase();
    const phone = (body?.phone || "").trim();
    const message = (body?.message || "").trim();

    if (!name || name.length < 2) {
      return NextResponse.json(
        { success: false, message: "الرجاء إدخال الاسم" },
        { status: 400 }
      );
    }

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { success: false, message: "الرجاء إدخال بريد إلكتروني صحيح" },
        { status: 400 }
      );
    }

    if (phone && !PHONE_REGEX.test(phone)) {
      return NextResponse.json(
        { success: false, message: "رقم الهاتف غير صحيح" },
        { status: 400 }
      );
    }

    if (!message || message.length < 10) {
      return NextResponse.json(
        { success: false, message: "الرجاء كتابة رسالة (10 أحرف على الأقل)" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const leadsCollection = db.collection("leads");

    const leadDoc = {
      name,
      email,
      phone: phone || null,
      message,
      formType: "contact_message",
      source: "website",
      emailSent: false,
      createdAt: new Date(),
    };

    const insertResult = await leadsCollection.insertOne(leadDoc);

    try {
      const recipientEmail = process.env.RECIPIENT_EMAIL || "shorookkhaled559@gmail.com";

      const { data, error } = await resend.emails.send({
        from: "Maram Group <onboarding@resend.dev>",
        to: [recipientEmail],
        subject: "رسالة تواصل جديدة | New Contact Message",
        react: ContactEmail({ name, email, phone, message }),
      });

      if (error) {
        throw error;
      }

      await leadsCollection.updateOne(
        { _id: insertResult.insertedId },
        { $set: { emailSent: true, emailId: data?.id } }
      );
    } catch (sendError: any) {
      console.error("Email send error:", sendError);
      throw sendError;
    }

    return NextResponse.json({
      success: true,
      message: "تم إرسال رسالتك بنجاح، سنتواصل معك قريباً",
    });
  } catch (err: any) {
    console.error("send-contact error:", err.message);
    return NextResponse.json(
      { success: false, message: "حصل خطأ، من فضلك حاولي تاني" },
      { status: 500 }
    );
  }
}
