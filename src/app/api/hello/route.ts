import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    hola: "mundo",
  });
}
export async function POST() {
  return NextResponse.json({
    hola: "mundo",
    method: "POST",
  });
}
