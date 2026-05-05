import type dayjs from "dayjs";
import "yup";

declare module "yup" {
  interface DateSchema<TType = any, TContext = any, TDefault = any, TFlags = any> {
    /**
     * Limits the date to the specified range. Defaults to now and 125 years prior.
     */
    validDateRange(
      min?: dayjs.ConfigType | null,
      max?: dayjs.ConfigType | null,
      message?: string
    ): this;
  }

  interface StringSchema<TType = any, TContext = any, TDefault = any, TFlags = any> {
    /**
     * Applies the template-specific validation rules used for test forms.
     */
    isTemplate(): this;

    /**
     * Conditionally enforces that a value is present unless the current form is marked as draft.
     */
    required(message?: string): this;

    /**
     * Trims the value and replaces non-printable characters with '*' to keep submissions clean.
     */
    trim2(message?: string): this;

    /**
     * Ensures the value matches the shared currency pattern.
     */
    isCurrency(): this;

    /**
     * Validates the value against the shared phone-number pattern.
     */
    isPhoneNumber(message?: string): this;
  }

  interface ArraySchema<TType = any, TContext = any, TDefault = any, TFlags = any> {
    /**
     * Makes sure at least one checkbox in a group evaluates to truthy.
     */
    checkboxGroupChecked(message?: string): this;
  }
}
