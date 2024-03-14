import connectToDB from "@/database/mongo.config";
import resetSuccessTemplate from "@/helpers/resetSuccessTemplate";
import sendEmail from "@/helpers/sendEmail";
import ResetLink from "@/models/ResetLink";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(request: NextRequest, { params }: any) {
  try {
    const tokens = params.id;
    await connectToDB();
    const user = await User.findById(tokens[0]);
    const verification = await ResetLink.findOne({ userId: user._id });

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

    return NextResponse.json(
      {
        success: true,
        message: "Allow Reset",
        status: 200,
      },
      { status: 200 }
    );
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

export async function POST(request: NextRequest, { params }: any) {
  try {
    const tokens = params.id;
    await connectToDB();
    const user = await User.findById(tokens[0]);
    const verification = await ResetLink.findOne({ userId: user._id });
    const data = await request.json();

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

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    await ResetLink.findOneAndDelete({ userId: user._id });

    await User.findByIdAndUpdate(tokens[0], {
      $set: { password: hashedPassword },
    });

    const mailOptions = {
      from: "iNotes@official.com",
      to: user.email,
      subject: "Password Changed Successfully",
      text: "The password for your account on iNotes has been changed.",
      html: resetSuccessTemplate(),
    };

    await sendEmail({ mailOptions: mailOptions });

    return NextResponse.json(
      {
        success: true,
        message: "Password Changed",
        status: 200,
      },
      { status: 200 }
    );
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
