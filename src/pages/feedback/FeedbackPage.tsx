import { TestimonialDto } from '@FullStackMap/from-a2b';
import { Carousel } from '@mantine/carousel';
import {
  Badge,
  Card,
  Center,
  Container,
  Group,
  Loader,
  Rating,
  Text,
  Title,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import Autoplay from 'embla-carousel-autoplay';
import { useEffect, useRef, useState } from 'react';
import { FormFeedback } from '../../components/feedback/FormFeedback';
import useNotify, { NotifyDto } from '../../hooks/useNotify';
import { AnoTestimonialsController } from '../../services/BaseApi';
import { AuthStore, useAuthStore } from '../../store/useAuthStore';

const FeedbackPage = () => {
  const autoplay = useRef(Autoplay({ delay: 5000 }));
  const { ErrorNotify } = useNotify();
  const isLogged: () => boolean = useAuthStore((s: AuthStore) => s.isLogged);

  const fetchTestimonials = async () => {
    try {
      const response = await AnoTestimonialsController.getAllTestimonialGET();
      return response.data;
    } catch (error) {
      handleError();
    }
  };

  const { data: reviews } = useQuery({
    queryKey: ['Testimonials'],
    queryFn: fetchTestimonials,
  });

  const handleError = () => {
    ErrorNotify({
      title: 'Erreur',
      message: 'Impossible de récupérer les avis',
    } as NotifyDto);
  };

  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    if (!reviews) return;

    const avgRating: number =
      reviews.reduce(
        (acc: number, review: TestimonialDto) => acc + review.rate!,
        0
      ) / reviews.length;

    setAverageRating(avgRating);
  }, [reviews]);

  return (
    <Container size="md">
      <Title order={1} ta="center" mt="md">
        Vos avis
      </Title>
      <Text mt="sm" ta="center" c="teal" fw={700}>
        Découvrez ce que nos clients disent à propos de nous.
      </Text>
      {reviews && reviews.length === 0 ? (
        <>
          <Text ta="center" pt="lg">
            Soyez le premier à donner votre avis !
          </Text>
        </>
      ) : null}
      {reviews && reviews.length > 0 ? (
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
          {reviews?.map((review: any) => (
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
      ) : (
        <Center>
          <Loader size="xl" mt="xl" />
        </Center>
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
      {isLogged() ? (
        <FormFeedback />
      ) : (
        <Text ta="center" c="teal" fw="bold">
          Connectez-vous pour donner votre avis
        </Text>
      )}
    </Container>
  );
};

export default FeedbackPage;
