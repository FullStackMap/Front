import { useEffect, useRef } from 'react';
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
import Autoplay from 'embla-carousel-autoplay';
import { FormFeedback } from '../../components/feedback/FormFeedback';
import { AnoTestimonialsController } from '../../services/BaseApi';
import { useMutation } from '@tanstack/react-query';

const FeedbackPage = () => {
  const autoplay = useRef(Autoplay({ delay: 5000 }));

  const testimonialsMutation = useMutation({
    mutationFn: async () => AnoTestimonialsController.getAllTestimonialGET(),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        testimonialsMutation.mutate();
      } catch (error) {
        console.error(
          "Une erreur s'est produite lors de la récupération des données :",
          error
        );
      }
    };

    fetchData();
  }, []);

  if (testimonialsMutation.error) {
    return (
      <div>
        Une erreur s'est produite : {testimonialsMutation.error.message}
      </div>
    );
  }

  const reviews = testimonialsMutation.data;
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
        {reviews?.data.map((review) => (
          <Carousel.Slide key={review.userId}>
            <Card shadow="sm" radius="md" withBorder h={190}>
              <Card.Section mah="70%">
                <Text size="md" m={20}>
                  {review.feedBack}
                </Text>
              </Card.Section>
              <Group mt="auto" justify="space-between">
                <Group>
                  <Badge bg="dark">{review.userId}</Badge>
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
