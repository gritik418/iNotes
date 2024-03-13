import connectToDB from "@/database/mongo.config";
import Todo from "@/models/Todo";
import User from "@/models/User";
import { verify } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const cookie = request.cookies.get("_at");
    const authToken = cookie?.value;
    const verifyToken: any = verify(authToken!, process.env.JWT_SECRET!);
    const data = await request.json();

    if (verifyToken) {
      await connectToDB();
      const user = await User.findOne({ email: verifyToken?.email });

      if (!user)
        return NextResponse.json(
          { success: false, status: 400, message: "Please Login." },
          { status: 401 }
        );

      const newTodo = new Todo({
        userId: user._id,
        content: data?.content,
      });

      const savedTodo = await newTodo.save();

      return NextResponse.json(
        {
          success: true,
          todo: savedTodo,
          status: 200,
          message: "Todo added.",
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
    await connectToDB();
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

      const todos = await Todo.find({ userId: user._id });
      return NextResponse.json(
        { success: true, status: 200, todos },
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
