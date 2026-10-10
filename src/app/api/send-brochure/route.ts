import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import fs from "node:fs/promises";
import path from "node:path";
import { getDb } from "@/lib/mongodb";
import { getLogoAttachment } from "@/lib/email-logo";
import BrochureEmail from "@/emails/BrochureEmail";

export const runtime = "nodejs";
export const maxDuration = 30;

const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let brochureCache: Buffer | null = null;
async function getBrochure(): Promise<Buffer> {
  if (!brochureCache) {
    brochureCache = await fs.readFile(
      path.join(process.cwd(), "public", "files", "maram-brochure.pdf")
    );
  }
  return brochureCache;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = (body?.email || "").trim().toLowerCase();

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { success: false, message: "الرجاء إدخال بريد إلكتروني صحيح" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const leadsCollection = db.collection("leads");

    const insertResult = await leadsCollection.insertOne({
      email,
      formType: "brochure_request",
      source: "website",
      emailSent: false,
      createdAt: new Date(),
    });

    const pdf = await getBrochure();

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: [email],
      subject: "Maram Group Brochure | بروشور مرام جروب",
      react: BrochureEmail(),
      attachments: [
        await getLogoAttachment(),
        { filename: "Maram-Group-Brochure.pdf", content: pdf },
      ],
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
      message: "تم إرسال البروشور بنجاح، من فضلك تأكدي من صندوق الوارد",
    });
  } catch (err: any) {
    console.error("send-brochure error:", err.message);
    return NextResponse.json(
      { success: false, message: "حصل خطأ، من فضلك حاولي تاني" },
      { status: 500 }
    );
  }
}