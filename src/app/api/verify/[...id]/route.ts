import connectToDB from "@/database/mongo.config";
import EmailVerification from "@/models/EmailVerification";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: any) {
  try {
    const tokens = params.id;
    await connectToDB();
    const user = await User.findById(tokens[0]);
    const verification = await EmailVerification.findOne({ userId: user._id });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          status: 401,
          message: "User Not Found",
        },
        { status: 401 }
      );
    }

    const isVerified = tokens[1] === verification.token;

    if (!isVerified) {
      return NextResponse.json(
        {
          success: false,
          status: 401,
          message: "Link Expired",
        },
        { status: 401 }
      );
    }
    await User.findByIdAndUpdate(tokens[0], { $set: { email_verified: true } });
    const token = jwt.sign(
      { email: user.email, avatar: user.avatar, id: user._id },
      process.env.JWT_SECRET!
    );

    const response = NextResponse.json(
      {
        success: true,
        message: "Account Verified",
        status: 200,
      },
      { status: 200 }
    );

    response.cookies.set("_at", token, {
      expires: Date.now() + 24 * 60 * 60 * 1000,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        status: 401,
        message: "Link Expired",
      },
      { status: 401 }
    );
  }
}
