import connectToDB from "@/database/mongo.config";
import resetPasswordTemplate from "@/helpers/resetPasswordTemplate";
import sendEmail from "@/helpers/sendEmail";
import ResetLink from "@/models/ResetLink";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    await connectToDB();
    if (!data.email || data.email === "") {
      return NextResponse.json(
        {
          message: "Email is required",
          status: 400,
          success: false,
        },
        { status: 500 }
      );
    }

    const user = await User.findOne({ email: data.email });
    if (!user || !user.email_verified) {
      return NextResponse.json(
        {
          message: "Invalid Email",
          status: 400,
          success: false,
        },
        { status: 500 }
      );
    }
    const token = uuidv4();

    await ResetLink.findOneAndDelete({ userId: user._id });

    const resetLink = new ResetLink({
      userId: user._id,
      token: token,
    });

    await resetLink.save();

    const link = `${process.env.NEXT_PUBLIC_DOMAIN}/reset-password/${user._id}/${token}`;

    const mailOptions = {
      from: "iNotes@official.com",
      to: user.email,
      subject: "Reset Password Link",
      text: "Reset your Password with the help of the given link.",
      html: resetPasswordTemplate(link),
    };

    await sendEmail({ mailOptions: mailOptions });

    return NextResponse.json(
      { message: "Email sent.", success: true, status: 200 },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Server Error",
        status: 400,
        success: false,
      },
      { status: 500 }
    );
  }
}
