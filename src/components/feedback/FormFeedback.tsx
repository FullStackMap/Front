import React, { useState } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { Button, Center, Title, Textarea, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import { StarLikeComponent } from '../starComponent/StarLikeComponent';
import useNotify, { NotifyDto } from '../../hooks/useNotify';
import { AuthStore, useAuthStore } from '../../store/useAuthStore';
import { AnoTestimonialsController } from '../../services/BaseApi';
import { useMutation } from '@tanstack/react-query';
import { AddTestimonialDto } from '@FullStackMap/from-a2b';

export const FormFeedback = () => {
  const MAX_CHARS = 500;

  const [charCount, setCharCount] = useState(0);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { SuccessNotify } = useNotify();
  const userId = useAuthStore((state: AuthStore) => state.user?.Id);

  const feedbackSchema = z.object({
    feedBack: z
      .string()
      .min(10, 'Le commentaire doit contenir au moins 10 caractères'),
    rate: z
      .number()
      .min(1, 'La note minimale est de 1')
      .max(5, 'La note maximale est de 5'),
  });

  const feedbackForm = useForm({
    validateInputOnChange: true,
    initialValues: {
      feedBack: '',
      rate: 0,
      testimonialDate: new Date().toISOString().split('T')[0],
    },
    validate: zodResolver(feedbackSchema),
  });

  const sendTestimonialMutation = useMutation({
    mutationFn: async ([id, dto]: [string, AddTestimonialDto]) =>
      await AnoTestimonialsController.createTestimonialAsyncPOST(id, dto),
    onSuccess: () => {
      SuccessNotify({
        title: 'Avis envoyé',
        message: 'Votre avis a bien été envoyé, merci !',
        autoClose: 5000,
      } as NotifyDto);
      feedbackForm.reset();
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!feedbackForm.isValid()) return;
    sendTestimonialMutation.mutate([userId!, feedbackForm.values]);
  };

  const handleChangeRating = (rate: number) => {
    feedbackForm.setValues({ ...feedbackForm.values, rate });
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const feedBack = event.target.value;
    setCharCount(feedBack.length);
    if (feedBack.length > MAX_CHARS) {
      event.target.value = feedBack.slice(0, MAX_CHARS);
      setCharCount(MAX_CHARS);
    }
    feedbackForm.setFieldValue('feedBack', feedBack.slice(0, MAX_CHARS));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Title order={2} mt={50} ta="center">
        Laissez votre avis
      </Title>
      <Textarea
        label="Votre commentaire"
        minRows={4}
        resize={!isMobile ? 'vertical' : 'none'}
        required
        placeholder='Ex: "J’ai adoré mon séjour, je recommande vivement !"'
        {...feedbackForm.getInputProps('feedBack')}
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
          loading={sendTestimonialMutation.isPending}
          disabled={!feedbackForm.isValid()}
          variant="filled"
          mb="lg">
          Envoyer
        </Button>
      </Center>
    </form>
  );
};
