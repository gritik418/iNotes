import { Schema, model, models } from "mongoose";

const ResetLinkSchema = new Schema({
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
  createdAt: { type: Date, expires: "10m", default: Date.now },
});

const ResetLink = models.ResetLink || model("ResetLink", ResetLinkSchema);

export default ResetLink;
