import {
  Container,
  Title,
  Text,
  Group,
  Rating,
  Center,
  Card,
  Badge,
} from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import FormFeedback from '../../components/feedback/FormFeedback';

const reviews = [
  {
    pseudo: 'John Doe',
    date: '2023-02-01',
    comment: 'La plateforme est très intuitive, je suis très satisfait !',
    rating: 5,
  },
  {
    pseudo: 'Jane Doe',
    date: '2023-01-15',
    comment:
      'J’ai eu un problème avec ma réservation, mais le service client a été très réactif et m’a aidé à trouver une solution.',
    rating: 4,
  },
  {
    pseudo: 'Bob Smith',
    date: '2022-12-20',
    comment:
      'Je suis un peu déçu par la qualité des services proposés, mais le rapport qualité-prix est correct.',
    rating: 3,
  },
  {
    pseudo: 'Alice Smith',
    date: '2022-12-01',
    comment:
      'Je recommande vivement cette plateforme, j’ai passé un excellent séjour !',
    rating: 5,
  },
  {
    pseudo: 'Eva Brown',
    date: '2022-11-15',
    comment:
      'Je suis très satisfaite de ma réservation, je n’hésiterai pas à revenir !',
    rating: 5,
  },
];

const FeedbackPage = () => {
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
      <FormFeedback />
    </Container>
  );
};

export default FeedbackPage;
