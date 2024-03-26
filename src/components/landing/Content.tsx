import {
  Badge,
  Container,
  Paper,
  SimpleGrid,
  Text,
  Timeline,
  TimelineItem,
  Title,
} from '@mantine/core';
import {
  IconCalendar,
  IconCheck,
  IconCompass,
  IconDownload,
  IconGlobe,
  IconMap,
  IconMapPin,
  IconPhoto,
  IconTicket,
  IconTimeline,
} from '@tabler/icons-react';
import { FeatureCard } from '../cardCustom/featureCard/FeatureCard';

const Content = () => {
  return (
    <Container size="lg" py="xl" mt={50} ta="center">
      <Badge variant="filled" size="xl" mb={50}>
        Organisez votre prochain voyage
      </Badge>
      <Timeline color="gray" active={1} lineWidth={6} bulletSize={40}>
        <TimelineItem bullet={<IconPhoto size={18} />}>
          <Paper shadow="xl" withBorder radius="lg" p="md">
            <Title order={4}>
              Trouvez des destinations pour votre prochain voyage
            </Title>
            <Text size="sm" c="teal.8">
              Utilisez notre moteur de recherche pour trouver des destinations
              en fonction de vos préférences.
            </Text>
          </Paper>
        </TimelineItem>
        <TimelineItem bullet={<IconMapPin size={18} />}>
          <Paper shadow="xl" withBorder radius="lg" p="md">
            <Title order={4}>
              Créez votre itinéraire et partagez-le avec vos amis
            </Title>
            <Text size="sm" c="teal.8">
              Utilisez notre outil de planification pour créer votre itinéraire
              et partagez-le avec vos amis pour obtenir leur avis.
            </Text>
          </Paper>
        </TimelineItem>
        <TimelineItem bullet={<IconCalendar size={18} />}>
          <Paper shadow="xl" withBorder radius="lg" p="md">
            <Title order={4}>
              Réservez vos billets d'avion, de train ou de bus
            </Title>
            <Text size="sm" c="teal.8">
              Utilisez notre moteur de recherche pour trouver les meilleurs
              tarifs pour vos billets d'avion, de train ou de bus.
            </Text>
          </Paper>
        </TimelineItem>
        <TimelineItem bullet={<IconCheck size={18} />}>
          <Paper shadow="xl" withBorder radius="lg" p="md">
            <Title order={4}>Profitez de votre voyage</Title>
            <Text size="sm" c="teal.8">
              Suivez votre itinéraire et profitez de votre voyage en toute
              sérénité grâce à notre application.
            </Text>
          </Paper>
        </TimelineItem>
      </Timeline>
      <Badge variant="filled" size="xl" mt={80}>
        Découvrez nos fonctionnalités
      </Badge>
      <Text c="dimmed" mt="md">
        Découvrez les fonctionnalités de notre application pour organiser votre
        prochain voyage.
      </Text>
      <SimpleGrid mt={20} cols={3} spacing="lg">
        <FeatureCard
          icon={<IconGlobe color="teal" size={24} />}
          title="Un voyage sur mesure"
          description="Trouvez des destinations pour votre prochain voyage"
        />
        <FeatureCard
          icon={<IconMap color="teal" size={24} />}
          title="Planifiez votre itinéraire"
          description="Créez votre itinéraire de bout en bout"
        />
        <FeatureCard
          icon={<IconCompass color="teal" size={24} />}
          title="Proposition d'activités"
          description="Recevez des propositions d'activités en fonction de vos préférences"
        />
        <FeatureCard
          icon={<IconTimeline color="teal" size={24} />}
          title="Calcul de l'estimation du temps"
          description="Calculez l'estimation du temps pour chaque activité"
        />
        <FeatureCard
          icon={<IconTicket color="teal" size={24} />}
          title="Réservez vos billets"
          description="Réservez vos billets d'avion, de train ou de bus"
        />
        <FeatureCard
          icon={<IconDownload color="teal" size={24} />}
          title="Téléchargez votre itinéraire"
          description="Téléchargez votre itinéraire pour l'utiliser hors ligne"
        />
      </SimpleGrid>
    </Container>
  );
};

export default Content;
