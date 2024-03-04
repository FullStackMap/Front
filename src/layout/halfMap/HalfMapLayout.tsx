import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet } from 'react-router-dom';
import DefaultFooter from '../../components/footer/DefaultFooter';
import DefaultHeader from '../../components/header/DefaultHeader';
import './HalfMapLayout.scss';

export const HalfMapLayout = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { desktop: true, mobile: !opened },
      }}
      footer={{ height: 120 }}
      padding="md">
      <AppShell.Header>
        <DefaultHeader burgerOpened={opened} toggleBurgerState={toggle} />
      </AppShell.Header>

      <AppShell.Main style={{ display: 'flex', flex: 1 }}>
        <div className="Content">
          <Outlet />
        </div>
        <div className="MapContainer">
          <h1>MapComponent</h1>
        </div>
      </AppShell.Main>
      <AppShell.Footer>
        <DefaultFooter />
      </AppShell.Footer>
    </AppShell>
  );
};
