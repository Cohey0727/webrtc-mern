"use client";
import { Column } from "@/components/containers";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./styles";
import { useForm } from "react-hook-form";
import { FormProvider, TextInputField, useAuth, useLoading } from "@/components";
import { Button, Typography } from "@mui/material";
import { LoginFormSchema, LoginFormValues } from "./schema";
import { useCallback } from "react";

type LoginFormProps = {
  onSubmitSuccess?: () => void;
};

const LoginFormId = "login-form";

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const { onSubmitSuccess } = props;
  const formContext = useForm<LoginFormValues>({
    resolver: zodResolver(LoginFormSchema),
  });
  const { login } = useAuth();
  const [loading, setLoading] = useLoading();

  const handleSubmit = useCallback(
    async (formValues: LoginFormValues) => {
      try {
        setLoading(true);
        await login(formValues);
        onSubmitSuccess?.();
      } finally {
        setLoading(false);
      }
    },
    [setLoading, login, onSubmitSuccess],
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
