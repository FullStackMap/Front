import React from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Group, Button, Container } from '@mantine/core';
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';

export const ChangeEmailForm = () => {
  const changeEmailSchema = z
    .object({
      email: z.string().email(),
      confirmEmail: z.string().email(),
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
    },
    validate: zodResolver(changeEmailSchema),
  });

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    throw new Error('Not implemented');
  };

  return (
    <Container mx="auto">
      <form onSubmit={handleSubmit} onReset={() => changeEmalForm.reset()}>
        <TextInput
          label="Email"
          placeholder="Email"
          required
          {...changeEmalForm.getInputProps('email')}
        />
        <TextInput
          mt="sm"
          label="Confirm Email"
          placeholder="Confirm Email"
          required
          {...changeEmalForm.getInputProps('confirmEmail')}
        />
        <Group justify="flex-end" mt="md">
          <Button
            type="submit"
            disabled={!changeEmalForm.isValid()}
            color="teal">
            Sauvegarder
          </Button>
        </Group>
      </form>
    </Container>
  );
};
