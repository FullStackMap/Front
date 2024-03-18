import { Button, Center, Title, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import { StarLikeComponent } from '../starComponent/StarLikeComponent';

const FormFeedback = () => {
  const feedbackSchema = z.object({
    comment: z
      .string()
      .min(10, 'le commentaire doit contenir au moins 10 caractères'),
    rating: z
      .number()
      .min(1, 'la note minimale est de 1')
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


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    throw new Error('Not implemented');
  };

  const handleChangeRating = (rating: number) => {
    feedbackForm.setValues({ ...feedbackForm.values, rating });
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

export default FormFeedback;
