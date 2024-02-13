import vine from "@vinejs/vine";
import { Infer } from "@vinejs/vine/types";

const SignupSchema = vine.object({
  first_name: vine.string().minLength(3),
  email: vine.string().email(),
  password: vine.string().minLength(8).maxLength(32).confirmed(),
});

export type SignupSchemaType = Infer<typeof SignupSchema>;

export default SignupSchema;
