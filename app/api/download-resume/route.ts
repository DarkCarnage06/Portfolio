import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const possiblePaths = [
    path.join(process.cwd(), "public", "Atharv_Randive_Resume.pdf"),
    path.join(process.cwd(), "public", "images", "Atharv_resume_info.pdf"),
    path.join(process.cwd(), "public", "Atharv_resume_info.pdf"),
  ];

  const filePath = possiblePaths.find((p) => fs.existsSync(p));

  if (!filePath) {
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

