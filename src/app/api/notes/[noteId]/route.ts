import connectToDB from "@/database/mongo.config";
import Notes from "@/models/Notes";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: any) {
  try {
    const { noteId } = params;
    if (!noteId) {
      return NextResponse.json(
        { success: false, status: 400, message: "Id is required." },
        { status: 400 }
      );
    }
    await connectToDB();

    const note = await Notes.findById(noteId);
    return NextResponse.json(
      { success: true, status: 200, note },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, status: 400, message: "Server Error." },
      { status: 500 }
    );
  }
}
