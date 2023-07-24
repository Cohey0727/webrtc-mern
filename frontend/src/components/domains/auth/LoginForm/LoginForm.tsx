"use client";
import { Column } from "@/components/containers";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./styles";
import { useForm } from "react-hook-form";
import { FormProvider, TextInputField, useLoading } from "@/components";
import { Button, Typography } from "@mui/material";
import { LoginFormSchema, LoginFormValues } from "./schema";
import { useCallback } from "react";
import { LoginResponse, login } from "@/api";

type LoginFormProps = {
  onSubmitSuccess?: (response: LoginResponse) => void;
};

const LoginFormId = "login-form";

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const { onSubmitSuccess } = props;
  const formContext = useForm<LoginFormValues>({
    resolver: zodResolver(LoginFormSchema),
  });
  const { setError } = formContext;
  const [loading, setLoading] = useLoading();

  const handleSubmit = useCallback(
    async (formValues: LoginFormValues) => {
      try {
        setLoading(true);
        const { email, password } = formValues;
        const res = await login({ email, password });
        onSubmitSuccess?.(res);
      } finally {
        setLoading(false);
      }
    },
    [setLoading, onSubmitSuccess],
  );

  return (
    <Column sx={styles.root}>
      <Typography variant="h2" sx={styles.title}>{`Login to What's App`}</Typography>
      <FormProvider formId={LoginFormId} {...formContext} onSubmit={handleSubmit}>
        <TextInputField name="email" label="Email" />
        <TextInputField name="password" label="password" type="Password" />
      </FormProvider>
      <Column sx={styles.actions}>
        <Button type="submit" variant="outlined" form={LoginFormId} disabled={loading}>
          Submit
        </Button>
      </Column>
    </Column>
  );
};

export type { LoginFormProps };
export default LoginForm;
