import { Tabs } from '@mantine/core';
import {useLocation, useNavigate} from 'react-router-dom';

const TabTravels = () => {

  const navigate = useNavigate();

  const location = useLocation();
  const currentPath = location.pathname;

  const getPageName = (path: string) => {
    const modifiedPath = path.replace('/trips', '');
    if (modifiedPath === '') return 'home'
    return modifiedPath;
  };

  return (
    <Tabs value={getPageName(currentPath)}>
      <Tabs.List>
        <Tabs.Tab value="home" onClick={() => navigate('')}>
          Mes Voyages
        </Tabs.Tab>
        <Tabs.Tab value="/history" onClick={() => navigate('history')}>
          Historique
        </Tabs.Tab>
        <Tabs.Tab value="/statistics" onClick={() => navigate('statistics')}>
          Statistiques
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
};
export default TabTravels;
