import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "Atharv_Randive_Resume.pdf");

  if (!fs.existsSync(filePath)) {
    return new NextResponse("Resume file not found", { status: 404 });
  }

  const fileBuffer = fs.readFileSync(filePath);

  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Atharv_Randive_Resume.pdf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}

