import { Button, Center, Title, Textarea, Rating } from '@mantine/core';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';

const FormFeedback = () => {
  const feedbackSchema = z.object({
    comment: z
      .string()
      .min(10, 'le commentaire doit contenir au moins 10 caractères'),
    rating: z
      .number()
      .min(0.5, 'la note minimale est de 0.5')
      .max(5, 'la note maximale est de 5'),
  });

  const feedbackForm = useForm({
    validateInputOnChange: true,
    initialValues: {
      comment: '',
      rating: 0,
    },

    validate: zodResolver(feedbackSchema),
  });

  const isButtonDisabled = !feedbackForm.isValid();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    throw new Error('Not implemented');
  };

  return (
    <form onSubmit={handleSubmit} onReset={() => feedbackForm.reset()}>
      <Title order={2} mt="xl" ta="center">
        Laissez votre avis
      </Title>
      <Textarea
        label="Votre commentaire"
        minRows={4}
        resize="both"
        required
        placeholder='Ex: "J’ai adoré mon séjour, je recommande vivement !"'
        {...feedbackForm.getInputProps('comment')}
      />
      <Center mt="sm">
        <Rating
          fractions={2}
          color="teal"
          size={50}
          title="Votre note"
          {...feedbackForm.getInputProps('rating')}
        />
      </Center>
      <Center mt="xl">
        <Button
          type="submit"
          disabled={isButtonDisabled}
          variant="filled"
          mb="lg">
          Envoyer
        </Button>
      </Center>
    </form>
  );
};

export default FormFeedback;
