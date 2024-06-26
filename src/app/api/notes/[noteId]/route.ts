import connectToDB from "@/database/mongo.config";
import Notes from "@/models/Notes";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { params }: any) {
  try {
    const { noteId } = params;
    const noteData = await request.json();
    if (!noteId) {
      return NextResponse.json(
        { success: false, status: 400, message: "Id is required." },
        { status: 400 }
      );
    }
    await connectToDB();

    const updatedNote = await Notes.findByIdAndUpdate(noteId, noteData, {
      new: true,
    });
    return NextResponse.json(
      { success: true, status: 200, note: updatedNote, message: "Updated." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, status: 400, message: "Server Error." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: any) {
  try {
    const { noteId } = params;
    if (!noteId) {
      return NextResponse.json(
        { success: false, status: 400, message: "Id is required." },
        { status: 400 }
      );
    }
    await connectToDB();

    await Notes.findByIdAndDelete(noteId);

    return NextResponse.json(
      { success: true, status: 200, noteId: noteId, message: "Deleted." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, status: 400, message: "Server Error." },
      { status: 500 }
    );
  }
}
