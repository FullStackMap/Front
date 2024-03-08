import { AppShell, Burger, Button, Group, Image } from '@mantine/core';
import {
  IconLogout,
  IconMapPins,
  IconSquareRoundedPlus,
  IconUserFilled,
} from '@tabler/icons-react';
import { useCallback } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { AuthStore, useAuthStore } from '../../store/useAuthStore';
import ProfileMenu from '../profileMenu/ProfileMenu';
import SwitchThemeIcon from '../switchThemeIcon/SwitchThemeIcon';

interface DefaultHeaderProps {
  burgerOpened: boolean;
  toggleBurgerState: () => void;
}

const DefaultHeader = (props: DefaultHeaderProps) => {
  const isLogged: () => boolean = useAuthStore((s: AuthStore) => s.isLogged);
  const logOut = useAuthStore((s: AuthStore) => s.logOut);
  const navigate: NavigateFunction = useNavigate();

  const logOutUser = useCallback(async () => {
    await logOut();
  }, []);

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
    logOutUser();
    navigate('/');
  };

  return (
    <>
      <Group py={10} mx={10} justify="space-between">
        <Burger
          opened={props.burgerOpened}
          onClick={props.toggleBurgerState}
          hiddenFrom="sm"
          size="sm"
        />
        <Image
          src="/vite.svg"
          alt="Logo du site"
          onClick={handleClickLogo}
          className="cursor-pointer"
        />
        <Group>
          <Group visibleFrom="sm">
            {isLogged && (
              <>
                <Button
                  leftSection={<IconSquareRoundedPlus size={20} />}
                  variant="light"
                  onClick={handleCreateTrip}>
                  Créer mon voyage
                </Button>
              </>
            )}
            <SwitchThemeIcon />
            <ProfileMenu />
          </Group>
        </Group>
      </Group>
      <AppShell.Navbar py="md" px={4}>
        <Button
          leftSection={<IconSquareRoundedPlus size={14} />}
          variant="subtle"
          onClick={handleCreateTrip}>
          Créer mon voyage
        </Button>
        <Button
          mt="xs"
          leftSection={<IconUserFilled size={14} />}
          variant="subtle"
          onClick={handleAccount}>
          Mon compte
        </Button>
        <Button
          mt="xs"
          leftSection={<IconMapPins size={14} />}
          variant="subtle"
          onClick={handleTrips}>
          Mes voyages
        </Button>
        <Button
          mt="xs"
          leftSection={<IconLogout size={14} />}
          variant="subtle"
          onClick={handleLogout}>
          Se déconnecter
        </Button>
        <SwitchThemeIcon asButton />
      </AppShell.Navbar>
    </>
  );
};

export default DefaultHeader;
