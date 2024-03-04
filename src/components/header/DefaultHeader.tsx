import { AppShell, Burger, Button, Group } from '@mantine/core';
import {
  IconLogout,
  IconMapPins,
  IconSquareRoundedPlus,
  IconUserFilled,
} from '@tabler/icons-react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { AuthStore, useAuthStore } from '../../store/useAuthStore';
import ProfileMenu from '../profileMenu/ProfileMenu';
import './DefaultHeader.scss';

interface DefaultHeaderProps {
  burgerOpened: boolean;
  toggleBurgerState: () => void;
}

const DefaultHeader = (props: DefaultHeaderProps) => {
  const isLogged: boolean = useAuthStore((s: AuthStore ) => s.isLogged);
  const navigate: NavigateFunction = useNavigate();

  const handleClickLogo = () => {
    navigate('/');
  };

  const handleCreateTrip = () => {
    //TODO: Redirect to create trip page
    throw new Error('CreateTrip Not implemented');
  };

  const handleAccount = () => {
    //TODO: Redirect to account page
    throw new Error('handleAccount Not implemented');
  };

  const handleTrips = () => {
    //TODO: Redirect to Trips list page
    throw new Error('handleTrips Not implemented');
  };

  const handleLogout = () => {
    //TODO: Redirect to logout page
    throw new Error('handleLogout Not implemented');
  };

  return (
    <>
      <Group h="100%" px="md">
        <Burger
          opened={props.burgerOpened}
          onClick={props.toggleBurgerState}
          hiddenFrom="sm"
          size="sm"
        />
        <Group justify="space-between" style={{ flex: 1 }}>
          <img
            src="/public/vite.svg"
            alt="Logo du site"
            onClick={handleClickLogo}
            className="cursor-pointer"
          />
          <Group ml="xl" gap={0} visibleFrom="sm">
            {isLogged && (
              <>
                <Button
                  mr="sm"
                  leftSection={<IconSquareRoundedPlus size={14} />}
                  variant="default"
                  onClick={handleCreateTrip}>
                  Créer mon voyage
                </Button>
              </>
            )}
            <ProfileMenu/>
          </Group>
        </Group>
      </Group>
      <AppShell.Navbar py="md" px={4}>
        <Button
          mt="xs"
          leftSection={<IconSquareRoundedPlus size={14} />}
          variant="default"
          onClick={handleCreateTrip}>
          Créer mon voyage
        </Button>
        <Button
          mt="xs"
          leftSection={<IconUserFilled size={14} />}
          variant="default"
          onClick={handleAccount}>
          Mon compte
        </Button>
        <Button
          mt="xs"
          leftSection={<IconMapPins size={14} />}
          variant="default"
          onClick={handleTrips}>
          Mes voyages
        </Button>
        <Button
          mt="xs"
          leftSection={<IconLogout size={14} />}
          variant="default"
          onClick={handleLogout}>
          Se déconnecter
        </Button>
      </AppShell.Navbar>
    </>
  );
};

export default DefaultHeader;
