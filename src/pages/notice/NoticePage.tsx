import {
  Container,
  Title,
  Text,
  Group,
  Rating,
  Textarea,
  Button,
  Center,
  Card,
  Badge,
} from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { useState } from 'react';

const reviews = [
  {
    pseudo: 'John Doe',
    date: '2023-02-01',
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    rating: 4,
  },
  {
    pseudo: 'Jane Doe',
    date: '2023-01-15',
    comment:
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    rating: 5,
  },
  {
    pseudo: 'Bob Smith',
    date: '2022-12-20',
    comment:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    rating: 3,
  },
];

const NoticePage = () => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

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
    <Container size="md">
      <Title order={1} ta="center" mt="md">
        Vos avis
      </Title>
      <Text mt="sm" ta="center" c="teal" fw={700}>
        Découvrez ce que nos clients disent à propos de nous.
      </Text>
      <Center mt="xl">
        <Rating
          value={4.5}
          readOnly
          fractions={2}
          color="teal"
          size={60}
          title="Note moyenne"
        />
      </Center>
      <Carousel slideSize="70%" height={200} slideGap="md" loop mt="md" mb="md">
        {reviews.map((review) => (
          <Carousel.Slide key={review.pseudo}>
            <Card shadow="sm" radius="md" withBorder h={190}>
              <Card.Section mah="70%">
                <Text size="md" m={20}>
                  {review.comment}
                </Text>
              </Card.Section>
              <Group mt="auto" justify="space-between">
                <Group>
                  <Badge bg="dark">{review.pseudo}</Badge>
                  <Text size="sm" c="dimmed">
                    {new Date(review.date).toLocaleDateString()}
                  </Text>
                </Group>
                <Rating
                  color="teal"
                  value={review.rating}
                  readOnly
                  title="Note attribuée par le client"
                />
              </Group>
            </Card>
          </Carousel.Slide>
        ))}
      </Carousel>
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
    </Container>
  );
};

export default NoticePage;
