/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResetPasswordDto } from '@FullStackMap/from-a2b';
import { Button, PasswordInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import { zodResolver } from 'mantine-form-zod-resolver';
import { useEffect } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useQueryParams } from '../../hooks/useQueryParams';
import { AnoAuthController } from '../../services/BaseApi';

export const ForgotPasswordPage = () => {
  const navigate: NavigateFunction = useNavigate();
  const queryParams = useQueryParams() as { Token: string; Email: string };

  useEffect(() => {
    if (!queryParams.Token || !queryParams.Email) navigate('/');
  }, [queryParams]);

  const [
    isResetPasswordButtonLoading,
    { toggle: toggleResetPasswordLoading, close: disableResetPasswordLoading },
  ] = useDisclosure(false);

  const resetPasswordSchema = z
    .object({
      email: z.string().email("l'email n'est pas valide"),
      password: z
        .string()
        .min(8, 'le mot de passe doit contenir au moins 8 caractères')
        .refine(
          (value: string) => new Set(value).size >= 4,
          'Le mot de passe doit contenir au moins 4 caractères uniques',
        )
        .refine(
          (value: string) => /[^0-9a-zA-Z]/.test(value),
          'Le mot de passe doit contenir au moins un caractère spécial',
        )
        .refine(
          (value: string) => /[0-9]/.test(value),
          'Le mot de passe doit contenir au moins un chiffre',
        )
        .refine(
          (value: string) => /[A-Z]/.test(value),
          'Le mot de passe doit contenir au moins une majuscule',
        )
        .refine(
          (value: string) => /[a-z]/.test(value),
          'Le mot de passe doit contenir au moins une minuscule',
        ),
      passwordConfirmation: z.string(),
      token: z.string(),
    })
    .refine(data => data.password === data.passwordConfirmation, {
      message: 'Les mots de passe ne correspondent pas',
      path: ['confirmPassword'],
    });

  const resetPasswordForm = useForm({
    validateInputOnChange: true,
    initialValues: {
      email: queryParams.Email,
      password: '',
      passwordConfirmation: '',
      token: queryParams.Token,
    },
    validate: zodResolver(resetPasswordSchema),
  });

  const successNotification = () => {
    notifications.show({
      message: 'Votre mot de passe à bien été mis à jour.',
      autoClose: 5000,
      color: 'teal',
      icon: <IconCheck />,
    });
  };

  const handleFromSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!resetPasswordForm.isValid()) return;
    console.log(resetPasswordForm.values as ResetPasswordDto);

    toggleResetPasswordLoading();
    try {
      await AnoAuthController.resetPasswordPOST(
        resetPasswordForm.values as ResetPasswordDto,
      );
      successNotification();
      navigate('/login');
    } catch (e: any) {
      console.log('🚀 ~ handleFromSubmit ~ e:', e.response.data);
      disableResetPasswordLoading();
      notifications.show({
        title: "Une erreur s'est produite",
        message: 'Merci de réessayer plus tard',
        autoClose: 5000,
        color: 'red',
        icon: <IconX />,
      });
    }
  };

  return (
    <>
      <Title order={3}>Réinitialiser le mot de passe</Title>
      <form
        onSubmit={handleFromSubmit}
        onReset={() => resetPasswordForm.reset()}>
        <PasswordInput
          label="Mot de passe"
          placeholder="Votre mot de passe"
          {...resetPasswordForm.getInputProps('password')}
        />
        <PasswordInput
          label="Confirmer le mot de passe"
          placeholder="Confirmer le mot de passe"
          {...resetPasswordForm.getInputProps('passwordConfirmation')}
        />
        <Button
          type="submit"
          loading={isResetPasswordButtonLoading}
          disabled={!resetPasswordForm.isValid()}>
          Réinitialiser
        </Button>
      </form>
    </>
  );
};
