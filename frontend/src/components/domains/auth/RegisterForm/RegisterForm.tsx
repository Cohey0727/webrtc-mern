"use client";
import { Column } from "@/components/containers";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./styles";
import { useForm } from "react-hook-form";
import { FormProvider, TextInputField, useLoading } from "@/components";
import { Button, Typography } from "@mui/material";
import { RegisterFormSchema, RegisterFormValues } from "./schema";
import { useCallback } from "react";
import { RegisterUserResponse, registerUser } from "@/api";

type RegisterFormProps = {
  onSubmitSuccess?: (response: RegisterUserResponse) => void;
};

const RegisterFormId = "register-form";

const RegisterForm: React.FC<RegisterFormProps> = (props) => {
  const { onSubmitSuccess } = props;
  const formContext = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterFormSchema),
  });
  const { setError } = formContext;
  const [loading, setLoading] = useLoading();

  const handleSubmit = useCallback(
    async (formValues: RegisterFormValues) => {
      try {
        setLoading(true);
        const { name, email, password, passwordConfirmation } = formValues;
        if (password !== passwordConfirmation) {
          setError("passwordConfirmation", {
            type: "manual",
            message: "passwords do not match",
          });
        }
        const res = await registerUser({ name, email, password });
        onSubmitSuccess?.(res);
      } finally {
        setLoading(false);
      }
    },
    [setError, setLoading, onSubmitSuccess],
  );

  return (
    <Column sx={styles.root}>
      <Typography variant="h2" sx={styles.title}>{`Welcome to What's App`}</Typography>
      <FormProvider formId={RegisterFormId} {...formContext} onSubmit={handleSubmit}>
        <TextInputField name="name" label="Name" />
        <TextInputField name="email" label="Email" />
        <TextInputField name="password" label="password" type="Password" />
        <TextInputField name="passwordConfirmation" label="Password confirmation" type="password" />
      </FormProvider>
      <Column sx={styles.actions}>
        <Button type="submit" variant="outlined" form={RegisterFormId} disabled={loading}>
          Submit
        </Button>
      </Column>
    </Column>
  );
};

export type { RegisterFormProps };
export default RegisterForm;
