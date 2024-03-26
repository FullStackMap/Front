import React, { useState } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { Button, Center, Title, Textarea, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import { StarLikeComponent } from '../starComponent/StarLikeComponent';

export const FormFeedback = () => {
  const MAX_CHARS = 500;

  const [charCount, setCharCount] = useState(0);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const feedbackSchema = z.object({
    comment: z
      .string()
      .min(10, 'Le commentaire doit contenir au moins 10 caractères'),
    rating: z
      .number()
      .min(1, 'La note minimale est de 1')
      .max(5, 'La note maximale est de 5'),
  });

  const feedbackForm = useForm({
    validateInputOnChange: true,
    initialValues: {
      comment: '',
      rating: 0,
    },
    validate: zodResolver(feedbackSchema),
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    throw new Error('Not implemented');
  };

  const handleChangeRating = (rating: number) => {
    feedbackForm.setValues({ ...feedbackForm.values, rating });
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const comment = event.target.value;
    setCharCount(comment.length);
    if (comment.length > MAX_CHARS) {
      event.target.value = comment.slice(0, MAX_CHARS);
      setCharCount(MAX_CHARS);
    }
    feedbackForm.setFieldValue('comment', comment.slice(0, MAX_CHARS));
  };

  return (
    <form onSubmit={handleSubmit} onReset={() => feedbackForm.reset()}>
      <Title order={2} mt={50} ta="center">
        Laissez votre avis
      </Title>
      <Textarea
        label="Votre commentaire"
        minRows={4}
        resize={!isMobile ? 'vertical' : 'none'}
        required
        placeholder='Ex: "J’ai adoré mon séjour, je recommande vivement !"'
        {...feedbackForm.getInputProps('comment')}
        onChange={handleCommentChange}
      />
      <Text
        size="sm"
        mt="sm"
        ta="end"
        c={charCount > MAX_CHARS ? 'red' : undefined}>
        {charCount} / {MAX_CHARS} caractères
      </Text>
      <Center mt="sm">
        <StarLikeComponent ChangeRating={handleChangeRating} />
      </Center>
      <Center mt="xl">
        <Button
          type="submit"
          disabled={!feedbackForm.isValid()}
          variant="filled"
          mb="lg">
          Envoyer
        </Button>
      </Center>
    </form>
  );
};
