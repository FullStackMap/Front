import {
  Box,
  Text,
  SimpleGrid,
  Card,
  Group,
  Timeline,
  TimelineItem,
  Center,
  Paper,
  Title,
} from '@mantine/core';
import {
  IconPhoto,
  IconMapPin,
  IconCalendar,
  IconCheck,
} from '@tabler/icons-react';

export function Content() {
  return (
    <Box>
      <Box mt={50}>
        <Center>
          <Timeline color="gray" active={1} lineWidth={6} bulletSize={40}>
            <TimelineItem bullet={<IconPhoto size={18} />}>
              <Paper shadow="xl" withBorder radius="lg" p="md">
                <Title order={4}>
                  Trouvez des destinations pour votre prochain voyage
                </Title>
                <Text>
                  Utilisez notre moteur de recherche pour trouver des
                  destinations en fonction de vos préférences.
                </Text>
              </Paper>
            </TimelineItem>
            <TimelineItem bullet={<IconMapPin size={18} />}>
              <Paper shadow="xl" withBorder radius="lg" p="md">
                <Title order={4}>
                  Créez votre itinéraire et partagez-le avec vos amis
                </Title>
                <Text>
                  Utilisez notre outil de planification pour créer votre
                  itinéraire et partagez-le avec vos amis pour obtenir leur
                  avis.
                </Text>
              </Paper>
            </TimelineItem>
            <TimelineItem bullet={<IconCalendar size={18} />}>
              <Paper shadow="xl" withBorder radius="lg" p="md">
                <Title order={4}>
                  Réservez vos billets d'avion, de train ou de bus
                </Title>
                <Text>
                  Utilisez notre moteur de recherche pour trouver les meilleurs
                  tarifs pour vos billets d'avion, de train ou de bus.
                </Text>
              </Paper>
            </TimelineItem>
            <TimelineItem bullet={<IconCheck size={18} />}>
              <Paper shadow="xl" withBorder radius="lg" p="md">
                <Title order={4}>Profitez de votre voyage</Title>
                <Text>
                  Suivez votre itinéraire et profitez de votre voyage en toute
                  sérénité grâce à notre application.
                </Text>
              </Paper>
            </TimelineItem>
          </Timeline>
        </Center>
      </Box>
      <SimpleGrid mt={20} mx={40} cols={3} spacing="lg">
        <DestinationCard
          icon={<IconPhoto size={24} />}
          title="Un voyage sur mesure"
          description="Trouvez des destinations pour votre prochain voyage"
        />
        <DestinationCard
          icon={<IconMapPin size={24} />}
          title="Planifiez votre itinéraire"
          description="Créez votre itinéraire et partagez-le avec vos amis"
        />
        <DestinationCard
          icon={<IconCalendar size={24} />}
          title="Réservez vos billets"
          description="Réservez vos billets d'avion, de train ou de bus"
        />
      </SimpleGrid>
    </Box>
  );
}

const DestinationCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group mb="xs">
        {icon}
        <Text w={500}>{title}</Text>
      </Group>
      <Text size="sm" c="dimmed">
        {description}
      </Text>
    </Card>
  );
};
