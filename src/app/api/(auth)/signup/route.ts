import connectToDB from "@/database/mongo.config";
import User from "@/models/User";
import vine, { errors } from "@vinejs/vine";
import { NextRequest, NextResponse } from "next/server";
import SignupSchema, { SignupSchemaType } from "@/validators/SignupSchema";
import ErrorReporter from "@/validators/ErrorReporter";
import EmailVerification from "@/models/EmailVerification";
import { v4 as uuidv4 } from "uuid";
import sendEmail from "@/helpers/sendEmail";

export type UserType = {
  first_name: String;
  last_name?: String;
  email: String;
  password: String;
  confirm_password: String;
};

export async function POST(request: NextRequest) {
  try {
    const userData: UserType = await request.json();
    await connectToDB();

    const output: SignupSchemaType = await vine.validate({
      schema: SignupSchema,
      data: userData,
      errorReporter: () => new ErrorReporter(),
    });

    const checkExisting = await User.findOne({ email: output.email });
    if (checkExisting && checkExisting.email_verified) {
      return NextResponse.json(
        {
          message: "Account already exists.",
          status: 400,
          success: false,
        },
        { status: 401 }
      );
    }

    if (checkExisting && !checkExisting.email_verified) {
      await User.findByIdAndDelete(checkExisting._id);
    }

    const user = new User(output);
    const savedUser = await user.save();
    const token = uuidv4();

    const verification = new EmailVerification({
      userId: savedUser._id,
      token: token,
    });

    await verification.save();

    await sendEmail({ email: output.email });

    return NextResponse.json(
      { message: "Email sent.", success: true, status: 200 },
      { status: 201 }
    );
  } catch (error: any) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json(
        {
          message: error.message,
          errors: error.messages,
          status: 400,
          success: false,
        },
        { status: 500 }
      );
    }
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
