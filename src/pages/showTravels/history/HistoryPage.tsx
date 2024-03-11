import { Container, Grid } from '@mantine/core';
import { HistoryTravelCard } from '../../../components/cardCustom/historyTravelCard/HistoryTravelCard.tsx';

const HistoryPage = () => {
  return (
    <Container size="xl" pt="xl">
      <Grid gutter="lg" align="center" mb="xl">
        {mockData.map((data, index) => (
          <Grid.Col key={index} span={{ base: 12, md: 6, lg: 3 }}>
            <HistoryTravelCard
              title={data.title}
              description={data.description}
              img={data.img}
              key={index}
            />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};

export default HistoryPage;

const mockData = [
  {
    title: 'Paris',
    description: 'Voyage à Paris',
    img: 'https://media.admagazine.fr/photos/632449f714420dbf05ebc6f9/16:9/w_2560%2Cc_limit/GettyImages-627393180.jpg',
  },
  {
    title: 'Paris',
    description: 'Voyage à Paris',
    img: 'https://media.admagazine.fr/photos/632449f714420dbf05ebc6f9/16:9/w_2560%2Cc_limit/GettyImages-627393180.jpg',
  },
  {
    title: 'Paris',
    description: 'Voyage à Paris',
    img: 'https://media.admagazine.fr/photos/632449f714420dbf05ebc6f9/16:9/w_2560%2Cc_limit/GettyImages-627393180.jpg',
  },
  {
    title: 'Paris',
    description: 'Voyage à Paris',
    img: 'https://media.admagazine.fr/photos/632449f714420dbf05ebc6f9/16:9/w_2560%2Cc_limit/GettyImages-627393180.jpg',
  },
  {
    title: 'Paris',
    description: 'Voyage à Paris',
    img: 'https://media.admagazine.fr/photos/632449f714420dbf05ebc6f9/16:9/w_2560%2Cc_limit/GettyImages-627393180.jpg',
  },
];
