import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getDb } from "@/lib/mongodb";
import { getLogoAttachment } from "@/lib/email-logo";
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

    const insertResult = await leadsCollection.insertOne({
      name,
      email,
      phone: phone || null,
      message,
      formType: "contact_message",
      source: "website",
      emailSent: false,
      createdAt: new Date(),
    });

    const recipientEmail = process.env.RECIPIENT_EMAIL!;

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: [recipientEmail],
      replyTo: email,
      subject: "رسالة تواصل جديدة | New Contact Message",
      react: ContactEmail({ name, email, phone, message }),
      attachments: [await getLogoAttachment()],
    });

    if (error) {
      throw new Error(`${error.name}: ${error.message}`);
    }

    await leadsCollection.updateOne(
      { _id: insertResult.insertedId },
      { $set: { emailSent: true, emailId: data?.id } }
    );

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