import { Tabs } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const TabTravels = () => {
  const navigate = useNavigate();
  return (
    <Tabs defaultValue="first">
      <Tabs.List>
        <Tabs.Tab value="first" onClick={() => navigate('')}>
          Mes Voyages
        </Tabs.Tab>
        <Tabs.Tab value="third" onClick={() => navigate('history')}>
          Historique
        </Tabs.Tab>
        <Tabs.Tab value="second" onClick={() => navigate('statistics')}>
          Statistiques
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
};
export default TabTravels;
