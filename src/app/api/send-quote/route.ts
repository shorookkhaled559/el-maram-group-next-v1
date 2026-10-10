import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getDb } from "@/lib/mongodb";
import { getLogoAttachment } from "@/lib/email-logo";
import QuoteEmail from "@/emails/QuoteEmail";

const resend = new Resend(process.env.RESEND_API_KEY);
const PHONE_REGEX = /^[\d\s\-\+\(\)]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = (body?.name || "").trim();
    const phone = (body?.phone || "").trim();
    const project = (body?.project || "").trim();
    const message = (body?.message || "").trim();

    if (!name || name.length < 2) {
      return NextResponse.json(
        { success: false, message: "الرجاء إدخال الاسم" },
        { status: 400 }
      );
    }

    if (!phone || !PHONE_REGEX.test(phone)) {
      return NextResponse.json(
        { success: false, message: "الرجاء إدخال رقم هاتف صحيح" },
        { status: 400 }
      );
    }

    if (!project) {
      return NextResponse.json(
        { success: false, message: "الرجاء اختيار مشروع" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const leadsCollection = db.collection("leads");

    const insertResult = await leadsCollection.insertOne({
      name,
      phone,
      project,
      message: message || null,
      formType: "quote_request",
      source: "website",
      emailSent: false,
      createdAt: new Date(),
    });

    const recipientEmail = process.env.RECIPIENT_EMAIL!;

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: [recipientEmail],
      subject: "طلب عرض سعر جديد | New Quote Request",
      react: QuoteEmail({ name, phone, project, message }),
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
      message: "تم إرسال طلبك بنجاح، سنتواصل معك قريباً",
    });
  } catch (err: any) {
    console.error("send-quote error:", err.message);
    return NextResponse.json(
      { success: false, message: "حصل خطأ، من فضلك حاولي تاني" },
      { status: 500 }
    );
  }
}