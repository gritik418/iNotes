import connectToDB from "@/database/mongo.config";
import Todo from "@/models/Todo";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, { params }: any) {
  try {
    const { todoId } = params;
    const todoData = await request.json();
    if (!todoId) {
      return NextResponse.json(
        { success: false, status: 400, message: "Id is required." },
        { status: 400 }
      );
    }
    await connectToDB();

    const updatedtodo = await Todo.findByIdAndUpdate(
      todoId,
      { $set: { isCompleted: todoData.isCompleted } },
      {
        new: true,
      }
    );
    return NextResponse.json(
      { success: true, status: 200, todo: updatedtodo, message: "Updated." },
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
    const { todoId } = params;
    if (!todoId) {
      return NextResponse.json(
        { success: false, status: 400, message: "Id is required." },
        { status: 400 }
      );
    }
    await connectToDB();

    await Todo.findByIdAndDelete(todoId);

    return NextResponse.json(
      { success: true, status: 200, todoId: todoId, message: "Deleted." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, status: 400, message: "Server Error." },
      { status: 500 }
    );
  }
}
