import React, { useEffect } from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Group, Button, Container } from '@mantine/core';
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import useNotify, { NotifyDto } from '../../../hooks/useNotify';
import { useQueryParams } from '../../../hooks/useQueryParams';
import { UserUpdateController } from '../../../services/BaseApi';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { UpdateUserMail } from '../../../services/api/Models/User/UpdateUserMailDto';

export const ChangeEmailForm = () => {
  const navigate: NavigateFunction = useNavigate();
  const { SuccessNotify, ErrorNotify } = useNotify();
  const queryParams = useQueryParams() as { Token: string; Email: string };
  useEffect(() => {
    if (!queryParams.Token || !queryParams.Email) navigate('/');
  }, [queryParams]);

  const changeEmailSchema = z
    .object({
      email: z.string().email(),
      confirmEmail: z.string().email(),
      token: z.string(),
    })
    .refine((data) => data.email === data.confirmEmail, {
      message: 'Les emails ne correspondent pas',
      path: ['confirmEmail'],
    });

  const changeEmalForm = useForm({
    validateInputOnChange: true,
    initialValues: {
      email: '',
      confirmEmail: '',
      token: queryParams.Token,
    },
    validate: zodResolver(changeEmailSchema),
  });

  const changeEmailMutation = useMutation({
    mutationFn: async (dto: UpdateUserMail) =>
      await UserUpdateController.updateUserMail(dto)
        .then(() => {
          SuccessNotify({
            title: 'Email modifié',
            message: 'Votre email a été modifié avec succès',
            autoClose: 5000,
          } as NotifyDto);
        })
        .catch(() => {
          ErrorNotify({} as NotifyDto);
        }),
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!changeEmalForm.isValid()) return;
    changeEmailMutation.mutate(changeEmalForm.values as UpdateUserMail);
  };

  return (
    <Container mx="auto">
      <form onSubmit={handleSubmit} onReset={() => changeEmalForm.reset()}>
        <TextInput
          label="Nouvel email"
          placeholder="Votre nouvel email"
          required
          {...changeEmalForm.getInputProps('email')}
        />
        <TextInput
          mt="sm"
          label="Confirmer email"
          placeholder="Confirmer votre nouvel email"
          required
          {...changeEmalForm.getInputProps('confirmEmail')}
        />
        <Group justify="flex-end" mt="md">
          <Button
            type="submit"
            loading={changeEmailMutation.isPending}
            disabled={!changeEmalForm.isValid()}
            color="teal">
            Confirmer
          </Button>
        </Group>
      </form>
    </Container>
  );
};
