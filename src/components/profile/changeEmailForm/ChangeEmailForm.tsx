import React, { useState } from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Group, Button, Container } from '@mantine/core';

const ChangeEmailForm = () => {
  const form = useForm({
    initialValues: {
      email: '',
      confirmEmail: '',
    },
    validate: {
      confirmEmail: (value, values) =>
        value !== values.email ? 'Emails do not match' : null,
    },
  });

  const [emailError, setEmailError] = useState<string>('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredEmail = event.target.value;
    form.setFieldValue('email', enteredEmail);

    const isValidEmail = validateEmail(enteredEmail);

    if (!isValidEmail) {
      setEmailError('Veuillez entrer un email valide');
    } else {
      setEmailError('');
    }
  };

  const handleConfirmEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const enteredConfirmEmail = event.target.value;
    form.setFieldValue('confirmEmail', enteredConfirmEmail);
  };

  return (
    <Container mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          label="Email"
          placeholder="Email"
          value={form.values.email}
          onChange={handleEmailChange}
          error={emailError}
          required
        />

        <TextInput
          mt="sm"
          label="Confirm Email"
          placeholder="Confirm Email"
          value={form.values.confirmEmail}
          onChange={handleConfirmEmailChange}
          error={form.errors.confirmEmail}
          required
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Send</Button>
        </Group>
      </form>
    </Container>
  );
};

export default ChangeEmailForm;
