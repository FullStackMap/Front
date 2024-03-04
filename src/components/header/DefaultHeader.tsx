import { AppShell, Burger, Button, Group, Image } from '@mantine/core';
import {
  IconLogout,
  IconMapPins,
  IconSquareRoundedPlus,
  IconUserFilled,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import ProfileMenu from '../profileMenu/ProfileMenu';

interface DefaultHeaderProps {
  burgerOpened: boolean;
  toggleBurgerState: () => void;
}

const DefaultHeader = (props: DefaultHeaderProps) => {
  const isLogged = true;
  const navigate = useNavigate();

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
      <Group py={10} mx={10} justify="space-between">
        <Burger
          opened={props.burgerOpened}
          onClick={props.toggleBurgerState}
          hiddenFrom="sm"
          size="sm"
        />
        <Image
          src="/public/vite.svg"
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
            <ProfileMenu isLogged={isLogged} />
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
      </AppShell.Navbar>
    </>
  );
};

export default DefaultHeader;
