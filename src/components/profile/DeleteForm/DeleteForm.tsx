import { useForm } from '@mantine/form';
import { TextInput, Group, Button, Container, Checkbox } from '@mantine/core';
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';

export const DeleteForm = () => {
  const deleteAccountSchema = z
    .object({
      email: z.string().email(),
      accept: z.boolean(),
    })
    .refine((data) => data.accept, {
      message: 'Vous devez accepter la suppression du compte',
      path: ['accept'],
    });

  const deleteForm = useForm({
    validateInputOnChange: true,
    initialValues: {
      email: '',
      accept: false,
    },
    validate: zodResolver(deleteAccountSchema),
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    throw new Error('Not implemented');
  };

  return (
    <Container mx="auto">
      <form onSubmit={handleSubmit} onReset={() => deleteForm.reset()}>
        <TextInput
          label="Email"
          placeholder="Email"
          required
          {...deleteForm.getInputProps('email')}
        />
        <Checkbox
          label="Confirmer la suppression du compte"
          mt="lg"
          {...deleteForm.getInputProps('accept')}
        />
        <Group justify="flex-end" mt="md">
          <Button type="submit" disabled={!deleteForm.isValid()} color="red">
            Supprimer le compte
          </Button>
        </Group>
      </form>
    </Container>
  );
};
