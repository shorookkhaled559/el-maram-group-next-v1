import fs from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

export async function GET() {
  try {
    const pdf = await fs.readFile(
      path.join(process.cwd(), "public", "files", "maram-brochure.pdf")
    );

    return new Response(new Uint8Array(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Maram-Group-Brochure.pdf"',
        "Content-Length": String(pdf.length),
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return new Response("File not found", { status: 404 });
  }
}