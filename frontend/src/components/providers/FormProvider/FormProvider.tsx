"use client";
import { createContext, useContext } from "react";
import {
  FieldValues,
  FormProvider as RhfFormProvider,
  FormProviderProps as RhfFormProviderProps,
} from "react-hook-form";
import { Merge } from "@/utils";

type BaseProps<TFieldValues extends FieldValues, TContext> = RhfFormProviderProps<
  TFieldValues,
  TContext
>;

type FormContext = {
  disabled?: boolean;
  disabledFields?: (keyof FieldValues)[];
};

type OwnProps<TFieldValues extends FieldValues> = {
  formId?: string;
  onSubmit?: (formValues: TFieldValues) => void;
  disabled?: boolean;
  disabledFields?: (keyof FieldValues)[];
};

type FormProviderProps<TFieldValues extends FieldValues, TContext> = Merge<
  BaseProps<TFieldValues, TContext>,
  OwnProps<TFieldValues>
>;

const FormContext = createContext<FormContext>({ disabled: false, disabledFields: [] });

function FormProvider<TFieldValues extends FieldValues, TContext = any>(
  props: FormProviderProps<TFieldValues, TContext>,
) {
  const { formId, disabled, disabledFields, onSubmit, handleSubmit, ...rest } = props;
  return (
    <FormContext.Provider value={{ disabled, disabledFields }}>
      <form id={formId} onSubmit={handleSubmit(onSubmit ?? (() => {}))}>
        <RhfFormProvider {...rest} handleSubmit={handleSubmit} />
      </form>
    </FormContext.Provider>
  );
}

const useFormContext = () => {
  const context = useContext(FormContext);
  return context;
};

export type { FormProviderProps };
export { useFormContext, FormContext };
export default FormProvider;
