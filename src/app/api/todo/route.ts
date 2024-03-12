import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    return NextResponse.json({ success: true });
  } catch (error) {}
}
