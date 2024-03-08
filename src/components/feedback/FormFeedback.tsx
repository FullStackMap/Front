import { useState } from 'react';
import { Button, Center, Title, Textarea, Rating } from '@mantine/core';

const FormFeedback = () => {
  const [comment, setComment] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(event.target.value);
    setIsButtonDisabled(!(event.target.value && rating));
  };

  const handleRatingChange = (value: number) => {
    setRating(value);
    setIsButtonDisabled(!(comment && value));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: submit form data
  };

  return (
    <form onSubmit={handleSubmit}>
      <Title order={2} mt="xl" ta="center">
        Laissez votre avis
      </Title>
      <Textarea
        label="Votre commentaire"
        value={comment}
        minRows={4}
        resize="both"
        required
        placeholder='Ex: "J’ai adoré mon séjour, je recommande vivement !"'
        onChange={handleCommentChange}></Textarea>
      <Center mt="sm">
        <Rating
          fractions={2}
          value={rating}
          color="teal"
          size={50}
          title="Votre note"
          onChange={handleRatingChange}
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
