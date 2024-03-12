import { Schema, model, models } from "mongoose";

const NoteSchema = new Schema(
  {
    title: {
      type: String,
    },
    label: {
      type: String,
      default: "General",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

const Notes = models.Note || model("Note", NoteSchema);

export default Notes;
