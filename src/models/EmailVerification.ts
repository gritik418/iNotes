import { Schema, model, models } from "mongoose";
import { genSalt, hash } from "bcryptjs";

const EmailVerificationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, expires: "2m", default: Date.now },
});

EmailVerificationSchema.pre("save", async function () {
  if (this.isModified("token")) {
    const salt = await genSalt(8);
    this.token = await hash(this.token, salt);
  }
});

const EmailVerification =
  models.EmailVerification ||
  model("EmailVerification", EmailVerificationSchema);

export default EmailVerification;
