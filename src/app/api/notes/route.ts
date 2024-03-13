import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import Notes from "@/models/Notes";

export async function POST(request: NextRequest) {
  try {
    const cookie = request.cookies.get("_at");
    const authToken = cookie?.value;
    const verifyToken: any = verify(authToken!, process.env.JWT_SECRET!);
    const data = await request.json();
    if (verifyToken) {
      const user = await User.findOne({ email: verifyToken?.email });

      if (!user)
        return NextResponse.json(
          { success: false, status: 400, message: "Please Login." },
          { status: 401 }
        );

      const newNote = new Notes({
        title: data?.title,
        label: data?.label,
        userId: user._id,
        content: data?.content,
      });

      const savedNote = await newNote.save();

      return NextResponse.json(
        {
          success: true,
          note: savedNote,
          status: 200,
          message: "Note added.",
        },
        { status: 201 }
      );
    }
    return NextResponse.json(
      { success: false, status: 400, message: "Please Login." },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, status: 400, message: "Server Error." },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const cookie = request.cookies.get("_at");
    const authToken = cookie?.value;
    const verifyToken: any = verify(authToken!, process.env.JWT_SECRET!);
    if (verifyToken) {
      const user = await User.findOne({ email: verifyToken?.email }).select({
        _id: 1,
      });
      if (!user) {
        return NextResponse.json(
          { success: false, status: 400, message: "Please Login." },
          { status: 401 }
        );
      }

      const notes = await Notes.find({ userId: user._id });
      return NextResponse.json(
        { success: true, status: 200, notes },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, status: 400, message: "Server Error." },
      { status: 500 }
    );
  }
}
