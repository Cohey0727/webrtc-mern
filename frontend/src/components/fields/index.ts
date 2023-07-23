"use client";
import { TextInput } from "../inputs";
import fieldize from "./fieldize";

export * from "./FieldLabel";
export { default as FieldLabel } from "./FieldLabel";

const TextInputField = fieldize(TextInput);

export { TextInputField };
