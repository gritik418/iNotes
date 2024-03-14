import { Schema, model, models } from "mongoose";

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
  createdAt: { type: Date, expires: "5m", default: Date.now },
});

const EmailVerification =
  models.EmailVerification ||
  model("EmailVerification", EmailVerificationSchema);

export default EmailVerification;
