import { useForm } from '@mantine/form';
import { PasswordInput, Group, Button, Container } from '@mantine/core';
const ChangePasswordForm = () => {
  const form = useForm({
    initialValues: {
      password: 'secret',
      confirmPassword: 'sevret',
    },
    validate: {
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
  });

  return (
    <Container mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <PasswordInput
          label="Password"
          placeholder="Password"
          {...form.getInputProps('password')}
        />
        <PasswordInput
          mt="sm"
          label="Confirm password"
          placeholder="Confirm password"
          {...form.getInputProps('confirmPassword')}
        />
        <Group justify="flex-end" mt="md">
          <Button type="submit">Envoyez</Button>
        </Group>
      </form>
    </Container>
  );
};

export default ChangePasswordForm;
