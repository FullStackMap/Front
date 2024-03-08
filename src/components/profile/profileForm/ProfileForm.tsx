import { useForm } from '@mantine/form';
import { NumberInput, TextInput, Button, Container } from '@mantine/core';

const ProfileForm = () => {
  const form = useForm({
    initialValues: {
      name: 'name',
      firstname: 'firstname',
      email: 'email@mail.fr',
      age: 12,
    },

    validate: {
      name: (value) =>
        value.length < 2 ? 'Name must have at least 2 letters' : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      age: (value) =>
        value < 18 ? 'You must be at least 18 to register' : null,
    },
  });
  return (
    <Container mx="auto">
      <form onSubmit={form.onSubmit(console.log)}>
        <TextInput
          label="Nom"
          placeholder="Nom"
          required
          {...form.getInputProps('name')}
        />
        <TextInput
          label="Prénom"
          placeholder="Prénom"
          required
          {...form.getInputProps('firstname')}
        />
        <TextInput
          disabled
          mt="sm"
          label="Email"
          placeholder="Email"
          required
          {...form.getInputProps('email')}
        />
        <NumberInput
          mt="sm"
          label="Age"
          placeholder="Age"
          min={0}
          max={99}
          suffix=" ans"
          stepHoldInterval={100}
          stepHoldDelay={500}
          {...form.getInputProps('age')}
        />
        <Button type="submit" mt="sm">
          Sauvegarder
        </Button>
      </form>
    </Container>
  );
};

export default ProfileForm;
