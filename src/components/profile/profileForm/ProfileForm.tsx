import { useForm } from '@mantine/form';
import {
  NumberInput,
  TextInput,
  Button,
  Container,
  Group,
} from '@mantine/core';
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';

export const ProfileForm = () => {
  const profileSchema = z.object({
    name: z.string().min(2),
    firstname: z.string().min(2),
    email: z.string().email(),
    age: z.number().min(18),
  });

  const profileform = useForm({
    validateInputOnChange: true,
    initialValues: {
      name: 'name',
      firstname: 'firstname',
      email: 'email@mail.fr',
      age: 20,
    },

    validate: zodResolver(profileSchema),
  });

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    throw new Error('Not implemented');
  };

  return (
    <Container mx="auto">
      <form onSubmit={handleSubmit} onReset={() => profileform.reset()}>
        <TextInput
          label="Nom"
          placeholder="Nom"
          required
          {...profileform.getInputProps('name')}
        />
        <TextInput
          mt="sm"
          label="Prénom"
          placeholder="Prénom"
          required
          {...profileform.getInputProps('firstname')}
        />
        <TextInput
          disabled
          mt="sm"
          label="Email"
          placeholder="Email"
          required
          {...profileform.getInputProps('email')}
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
          {...profileform.getInputProps('age')}
        />
        <Group justify="flex-end" mt="md">
          <Button type="submit" mt="sm" disabled={!profileform.isValid()}>
            Sauvegarder
          </Button>
        </Group>
      </form>
    </Container>
  );
};
