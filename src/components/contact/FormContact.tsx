import React, { useState } from 'react';
import { useMediaQuery } from '@mantine/hooks';
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
  const MAX_CHARS = 500;
  const [charCount, setCharCount] = useState(0);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const contactSchema = z.object({
    name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
    subject: z.string().min(5, 'Le sujet doit contenir au moins 5 caractères'),
    email: z.string().email("L'email n'est pas valide"),
    message: z
      .string()
      .min(10, 'Le message doit contenir au moins 10 caractères'),
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

  const handleMessageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const message = event.target.value;
    setCharCount(message.length);
    if (message.length > MAX_CHARS) {
      event.target.value = message.slice(0, MAX_CHARS);
      setCharCount(MAX_CHARS);
    }
    contactForm.setFieldValue('message', message.slice(0, MAX_CHARS));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    throw new Error('Not implemented');
  };

  return (
    <form
      className="contact__form"
      onSubmit={handleSubmit}
      onReset={() => {
        contactForm.reset();
        setCharCount(0);
      }}>
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
          resize={!isMobile ? 'vertical' : 'none'}
          required
          {...contactForm.getInputProps('message')}
          onChange={handleMessageChange}
        />
        <Text
          size="sm"
          mt="sm"
          ta="end"
          c={charCount > MAX_CHARS ? 'red' : undefined}>
          {charCount} / {MAX_CHARS} caractères
        </Text>
        <Group justify="flex-end" mt="md">
          <Button
            className="contact__control"
            type="submit"
            disabled={!contactForm.isValid()}>
            Envoyer
          </Button>
        </Group>
      </div>
    </form>
  );
};
