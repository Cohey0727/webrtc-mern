"use client";
import { Column } from "@/components/containers";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./styles";
import { useForm } from "react-hook-form";
import { FormProvider, TextInputField } from "@/components";
import { Button, Typography } from "@mui/material";
import { RegisterFormSchema, RegisterFormValues } from "./schema";
import { useCallback } from "react";
import { registerUser } from "@/api";

type RegisterFormProps = {};

const RegisterFormId = "register-form";

const RegisterForm: React.FC<RegisterFormProps> = () => {
  const formContext = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterFormSchema),
  });
  const { setError } = formContext;

  const handleSubmit = useCallback(
    async (formValues: RegisterFormValues) => {
      const { name, email, password, passwordConfirmation } = formValues;
      if (password !== passwordConfirmation) {
        setError("passwordConfirmation", {
          type: "manual",
          message: "passwords do not match",
        });
      }
      await registerUser({ name, email, password });
    },
    [setError],
  );

  return (
    <Column sx={styles.root}>
      <Typography variant="h2" sx={styles.title}>{`Welcome to What's App`}</Typography>
      <FormProvider formId={RegisterFormId} {...formContext} onSubmit={handleSubmit}>
        <TextInputField name="name" label="name" />
        <TextInputField name="email" label="email" />
        <TextInputField name="password" label="password" type="password" />
        <TextInputField name="passwordConfirmation" label="password confirmation" type="password" />
      </FormProvider>
      <Column sx={styles.actions}>
        <Button type="submit" variant="outlined" form={RegisterFormId}>
          Submit
        </Button>
      </Column>
    </Column>
  );
};

export type { RegisterFormProps };
export default RegisterForm;
