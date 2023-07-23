"use client";
import React from "react";
import { Controller, ControllerProps } from "react-hook-form";
import { Column, useFormContext } from "@/components";
import FieldLabel from "./FieldLabel";

type BaseProps = Omit<ControllerProps<any>, "render">;

type Options = {
  valueProp: string;
  valuePaths: string[];
};

type InnerProps = {
  label: string;
  required?: boolean;
  disabled?: boolean;
};

const defaultOptions = {
  valueProp: "value",
  valuePaths: [],
};

function fieldize<T>(Component: React.ComponentType<T>, options: Partial<Options> = {}) {
  const ResComponent: React.FC<BaseProps & InnerProps & T> = (props) => {
    const { name, defaultValue, label, required, disabled = false, ...rest } = props;
    const { disabled: formDisabled = false, disabledFields = [] } = useFormContext();
    return (
      <Controller
        name={name}
        defaultValue={defaultValue}
        render={({ field: { value, ref, onChange, ...fieldRest }, fieldState: { error } }) => {
          const { valueProp, valuePaths } = {
            ...defaultOptions,
            ...options,
          };
          return (
            <Column>
              <FieldLabel required={required}>{label}</FieldLabel>
              <Component
                {...(fieldRest as any)}
                {...rest}
                {...{ [valueProp]: value }}
                error={error ? true : undefined}
                disabled={disabled || formDisabled || disabledFields.includes(name)}
                onChange={(e: any) => {
                  const value = valuePaths.reduce((acc, path) => acc[path], e);
                  onChange(value);
                }}
              />
              {/* {error && <Alert severity="error">{error.message}</Alert>} */}
            </Column>
          );
        }}
      />
    );
  };
  return ResComponent;
}

export default fieldize;
