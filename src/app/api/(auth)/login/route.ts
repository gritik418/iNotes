"use server";
import connectToDB from "@/database/mongo.config";
import User from "@/models/User";
import ErrorReporter from "@/validators/ErrorReporter";
import LoginSchema, { LoginSchemaType } from "@/validators/LoginSchema";
import vine, { errors } from "@vinejs/vine";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json();
    await connectToDB();

    const output: LoginSchemaType = await vine.validate({
      schema: LoginSchema,
      data: userData,
      errorReporter: () => new ErrorReporter(),
    });

    const user = await User.findOne({ email: output.email });
    if (user && user.email_verified) {
      const verify = await bcrypt.compare(output.password, user.password);
      if (!verify) {
        return NextResponse.json(
          {
            message: "Invalid Credentials.",
            status: 400,
            success: false,
          },
          { status: 401 }
        );
      }

      const token = jwt.sign(
        { email: user.email, avatar: user.avatar, id: user._id },
        process.env.JWT_SECRET!
      );

      const response = NextResponse.json(
        {
          message: "Logged In successfully.",
          data: {
            email: user.email,
            _id: user._id,
          },
          token,
          status: 200,
          success: true,
        },
        { status: 201 }
      );

      response.cookies.set("_at", token, {
        httpOnly: true,
        expires: Date.now() + 24 * 60 * 60 * 1000,
      });

      return response;
    }
    return NextResponse.json(
      {
        message: "Invalid Credentials.",
        status: 400,
        success: false,
      },
      { status: 401 }
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
        { status: 400 }
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
