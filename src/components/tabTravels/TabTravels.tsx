import { Container, Tabs, Title } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';

const TabTravels = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const currentPath = location.pathname;

  const getPageName = (path: string) => {
    const modifiedPath = path.replace('/trips', '');
    if (modifiedPath === '') return 'home';
    return modifiedPath;
  };

  return (
    <Container size="xl" mt="xl">
      <Tabs value={getPageName(currentPath)}>
        <Tabs.List grow justify="center">
          <Tabs.Tab value="/statistics" onClick={() => navigate('statistics')}>
            <Title order={4}>Statistiques</Title>
          </Tabs.Tab>
          <Tabs.Tab value="home" onClick={() => navigate('')}>
            <Title order={4}>Voyages</Title>
          </Tabs.Tab>
          <Tabs.Tab value="/history" onClick={() => navigate('history')}>
            <Title order={4}>Historique</Title>
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </Container>
  );
};
export default TabTravels;
