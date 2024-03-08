import React, { useState } from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Group, Button, Container, Checkbox } from '@mantine/core';

const DeleteForm = () => {
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
  const [isChecked, setIsChecked] = useState<boolean>(false);

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

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
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
        <Checkbox
          label="Confirmer la suppression du compte"
          mt="lg"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <Group justify="flex-end" mt="md">
          <Button type="submit" disabled={!isChecked || !!emailError}>
            Confirmer
          </Button>
        </Group>
      </form>
    </Container>
  );
};

export default DeleteForm;
