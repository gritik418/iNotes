import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
    },
    last_name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    email_verified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
    },
    provider: {
      type: String,
      enum: ["credentials", "google"],
      default: "credentials",
    },
    avatar: {
      type: String,
      default: `${process.env.HOST}/images/avatar.png`,
    },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);

export default User;
