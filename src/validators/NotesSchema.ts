import vine from "@vinejs/vine";
import { Infer } from "@vinejs/vine/types";

const NotesSchema = vine.object({
  label: vine.string(),
  content: vine.string().minLength(1),
  title: vine.string(),
});

export type NotesSchemaType = Infer<typeof NotesSchema>;

export default NotesSchema;
