import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
  try {
    const authToken = request.cookies.get("_at")?.value;

    const user = jwt.decode(authToken!);

    if (user) {
      return NextResponse.json(
        {
          user,
          success: true,
          status: 200,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        status: 400,
        message: "Not Logged In.",
      },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        status: 400,
        message: "Server Error.",
      },
      { status: 500 }
    );
  }
}
