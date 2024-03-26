import { useRef } from 'react';
import {
  Container,
  Title,
  Text,
  Group,
  Rating,
  Center,
  Card,
  Badge,
  Loader,
} from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { FormFeedback } from '../../components/feedback/FormFeedback';
import { AnoTestimonialsController } from '../../services/BaseApi';
import { useQuery } from '@tanstack/react-query';
import useNotify, { NotifyDto } from '../../hooks/useNotify';

const FeedbackPage = () => {
  const autoplay = useRef(Autoplay({ delay: 5000 }));
  const { ErrorNotify } = useNotify();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['testimonials'],
    queryFn: AnoTestimonialsController.getAllTestimonialGET,
  });

  if (error) {
    ErrorNotify({
      title: 'Erreur',
      message: 'Impossible de récupérer les avis',
    } as NotifyDto);
  }

  const reviews = data;
  let averageRating = 0;

  if (reviews?.data) {
    const validReviews = reviews.data.filter(
      (review) => typeof review.rate === 'number' && review.rate !== undefined
    );
    if (validReviews.length > 0) {
      averageRating =
        validReviews.reduce((acc, review) => acc + review.rate!, 0) /
        validReviews.length;
    }
  }

  return (
    <Container size="md">
      <Title order={1} ta="center" mt="md">
        Vos avis
      </Title>
      <Text mt="sm" ta="center" c="teal" fw={700}>
        Découvrez ce que nos clients disent à propos de nous.
      </Text>
      {isPending && (
        <Center>
          <Loader size="xl" mt="xl" />
        </Center>
      )}
      {isError && <Text ta="center">Une erreur est survenue</Text>}
      {reviews && reviews.data.length === 0 && (
        <Text ta="center" pt="lg">
          Soyez le premier à donner votre avis !
        </Text>
      )}
      {!isPending && reviews && reviews.data.length > 0 && (
        <Carousel
          slideSize="70%"
          plugins={[autoplay.current]}
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={autoplay.current.reset}
          height={200}
          slideGap="md"
          loop
          mt="md"
          mb="md">
          {reviews?.data.map((review: any) => (
            <Carousel.Slide key={review.userId}>
              <Card shadow="sm" radius="md" withBorder h={190}>
                <Card.Section mah="70%">
                  <Text size="md" m={20}>
                    {review.feedBack}
                  </Text>
                </Card.Section>
                <Group mt="auto" justify="space-between">
                  <Group>
                    <Badge bg="dark">{review.user?.userName}</Badge>
                    <Text size="sm" c="dimmed">
                      {review.testimonialDate}
                    </Text>
                  </Group>
                  <Rating
                    color="teal"
                    value={review.rate || 0}
                    readOnly
                    title="Note attribuée par le client"
                  />
                </Group>
              </Card>
            </Carousel.Slide>
          ))}
        </Carousel>
      )}
      <Title order={3} mt="xl" ta="center">
        La note attribuée par nos clients
      </Title>
      <Center mt="md" mb="xl">
        <Rating
          value={averageRating}
          readOnly
          color="teal"
          size={50}
          title="Note moyenne"
        />
      </Center>
      <FormFeedback />
    </Container>
  );
};

export default FeedbackPage;
