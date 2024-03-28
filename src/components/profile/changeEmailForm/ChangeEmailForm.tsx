import React from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Group, Button, Container } from '@mantine/core';
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import useNotify, { NotifyDto } from '../../../hooks/useNotify';
import { UserController } from '../../../services/BaseApi';
import { useMutation } from '@tanstack/react-query';
import { UpdateUserMailDto } from '@FullStackMap/from-a2b';

interface ChangeEmailFormProps {
  userId: string | undefined;
}

export const ChangeEmailForm = (props: ChangeEmailFormProps) => {
  const { SuccessNotify } = useNotify();

  const changeEmailSchema = z
    .object({
      email: z.string().email(),
      confirmEmail: z.string().email(),
    })
    .refine((data) => data.email === data.confirmEmail, {
      message: 'Les emails ne correspondent pas',
      path: ['confirmEmail'],
    });

  const changeEmailForm = useForm({
    validateInputOnChange: true,
    initialValues: {
      email: '',
      confirmEmail: '',
    },
    validate: zodResolver(changeEmailSchema),
  });

  const changeEmailMutation = useMutation({
    mutationFn: async ([id, dto]: [string, UpdateUserMailDto]) =>
      await UserController.updateUserMailAsyncPATCH(id, dto),
    onSuccess: () => {
      SuccessNotify({
        title: 'Email modifié',
        message: 'Votre email a été modifié avec succès',
        autoClose: 5000,
      } as NotifyDto);
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!changeEmailForm.isValid()) return;
    changeEmailMutation.mutate([
      props.userId!,
      { mail: changeEmailForm.values.email } as UpdateUserMailDto,
    ]);
  };

  return (
    <Container mx="auto">
      <form onSubmit={handleSubmit} onReset={() => changeEmailForm.reset()}>
        <TextInput
          label="Nouvel email"
          placeholder="Votre nouvel email"
          required
          {...changeEmailForm.getInputProps('email')}
        />
        <TextInput
          mt="sm"
          label="Confirmer email"
          placeholder="Confirmer votre nouvel email"
          required
          {...changeEmailForm.getInputProps('confirmEmail')}
        />
        <Group justify="flex-end" mt="md">
          <Button
            type="submit"
            loading={changeEmailMutation.isPending}
            disabled={!changeEmailForm.isValid()}
            color="teal">
            Confirmer
          </Button>
        </Group>
      </form>
    </Container>
  );
};
