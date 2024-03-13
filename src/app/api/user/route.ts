import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import connectToDB from "@/database/mongo.config";

export async function GET(request: NextRequest) {
  try {
    connectToDB();
    const authToken = request.cookies.get("_at")?.value;

    const user: any = jwt.decode(authToken!);

    const userData = await User.findOne({ email: user?.email }).select({
      first_name: 1,
      last_name: 1,
      email: 1,
      avatar: 1,
      email_verified: 1,
    });

    if (userData && userData.email_verified) {
      return NextResponse.json(
        {
          user: userData,
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
