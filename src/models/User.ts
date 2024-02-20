import { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";

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
      default: `${process.env.NEXT_PUBLIC_DOMAIN}/images/avatar.png`,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password!, salt);
    this.password = hashedPassword;
  }
  next();
});

const User = models.User || model("User", UserSchema);

export default User;
