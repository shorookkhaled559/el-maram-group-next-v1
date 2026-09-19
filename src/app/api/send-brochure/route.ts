// app/api/send-brochure/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getDb } from "@/lib/mongodb";
import BrochureEmail from "@/emails/BrochureEmail";

const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

    const leadDoc = {
      email,
      formType: "brochure_request",
      source: "website",
      emailSent: false,
      createdAt: new Date(),
    };

    const insertResult = await leadsCollection.insertOne(leadDoc);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
    
    const brochureUrl = `${baseUrl}/files/maram-brochure.pdf`;
    const logoUrl = `${baseUrl}/assets/maram-logo.png`;

    try {
      const testMode = !process.env.RESEND_DOMAIN_VERIFIED;
      const recipientEmail = testMode 
        ? (process.env.RECIPIENT_EMAIL || 'shorookkhaled559@gmail.com')
        : email;

      const { data, error } = await resend.emails.send({
        from: 'Maram Group <onboarding@resend.dev>',
        to: [recipientEmail],
        subject: "Maram Group Brochure | بروشور مرام جروب",
        react: BrochureEmail({ brochureUrl, logoUrl }),
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
