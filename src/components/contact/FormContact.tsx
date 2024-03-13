import {
  Button,
  Group,
  SimpleGrid,
  Text,
  TextInput,
  Textarea,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';

export const FormContact = () => {
  const contactSchema = z.object({
    email: z.string().email("l'email n'est pas valide"),
    message: z
      .string()
      .min(10, 'le message doit contenir au moins 10 caractères'),
  });

  const contactForm = useForm({
    validateInputOnChange: true,
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },

    validate: zodResolver(contactSchema),
  });

  const isContactButtonDisabled = !contactForm.isValid();

  const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    throw new Error('Not implemented');
  };

  return (
    <form
      className="contact__form"
      onSubmit={handleSubmit}
      onReset={() => contactForm.reset()}>
      <Text className="contact__title" fz="lg" fw={700}>
        Envoyez-nous un message
      </Text>
      <div className="contact__fields">
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          <TextInput
            label="Nom"
            placeholder="Votre nom"
            required
            {...contactForm.getInputProps('name')}
          />
          <TextInput
            label="Email"
            placeholder="Votre email"
            required
            {...contactForm.getInputProps('email')}
          />
        </SimpleGrid>
        <TextInput
          mt="md"
          label="Sujet"
          placeholder="Sujet de votre message"
          required
          {...contactForm.getInputProps('subject')}
        />
        <Textarea
          mt="md"
          label="Message"
          placeholder="Merci de nous laisser un message"
          minRows={3}
          resize="both"
          {...contactForm.getInputProps('message')}
        />
        <Group justify="flex-end" mt="md">
          <Button
            className="contact__control"
            type="submit"
            disabled={isContactButtonDisabled}>
            Envoyer
          </Button>
        </Group>
      </div>
    </form>
  );
};
