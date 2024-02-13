import { errors } from "@vinejs/vine";
import { FieldContext, ErrorReporterContract } from "@vinejs/vine/types";
import vine, { SimpleMessagesProvider } from "@vinejs/vine";

vine.messagesProvider = new SimpleMessagesProvider({
  // Applicable for all fields
  required: "The {{ field }} field is required",
  string: "The value of {{ field }} field must be a string",
  email: "The value is not a valid email address",

  // Error message for the username field
  "first_name.required": "First Name must be defined",
  "first_name.minLength": "First Name must have at least 3 characters",
  "password.confirmed":
    "The password field and password confirmation field must be the same",
});

export class ErrorReporter implements ErrorReporterContract {
  /**
   * A flag to know if one or more errors have been
   * reported
   */
  hasErrors: boolean = false;

  /**
   * A collection of errors. Feel free to give accurate types
   * to this property
   */
  errors: any = {};

  /**
   * VineJS call the report method
   */
  report(message: string, rule: string, field: FieldContext, meta?: any) {
    this.hasErrors = true;

    /**
     * Collecting errors as per the JSONAPI spec
     */
    this.errors[field.name] = message;
    //     this.errors({
    //       code: rule,
    //       detail: message,
    //       source: {
    //         pointer: field.wildCardPath
    //       },
    //       ...(meta ? { meta } : {})
    //     })
  }

  /**
   * Creates and returns an instance of the
   * ValidationError class
   */
  createError() {
    return new errors.E_VALIDATION_ERROR(this.errors);
  }
}

export default ErrorReporter;
