import fs from "node:fs/promises";
import path from "node:path";

let cache: Buffer | null = null;

export async function getLogoAttachment() {
  if (!cache) {
    cache = await fs.readFile(
      path.join(process.cwd(), "public", "assets", "maram-logo.png")
    );
  }
  return {
    filename: "maram-logo.png",
    content: cache,
    contentType: "image/png",
    contentId: "maram-logo",
  };
}