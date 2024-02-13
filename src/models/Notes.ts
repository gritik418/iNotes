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
    isTemporarilyDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Notes = models.Note || model("Note", NoteSchema);

export default Notes;
