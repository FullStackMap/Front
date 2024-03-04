import { ActionIcon, Menu, rem } from '@mantine/core';
import {
  IconHistory,
  IconLogin,
  IconLogout,
  IconMapPins,
  IconUser,
  IconUserFilled,
} from '@tabler/icons-react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { AuthStore, useAuthStore } from '../../store/useAuthStore';


const ProfileMenu = () => {
  const navigate: NavigateFunction = useNavigate()
  const isLogged: boolean = useAuthStore((s: AuthStore) => s.isLogged)

  const handleAccount = () => {
    throw new Error('handleAccount Not implemented');
  };

  const handleTrips = () => {
    throw new Error('handleTrips Not implemented');
  };

  const handleLogout = () => {
    throw new Error('handleLogout Not implemented');
  };

  return (
    <Menu
      trigger="click-hover"
      openDelay={100}
      closeDelay={400}
      shadow="md"
      width={200}
      transitionProps={{ transition: 'skew-up', duration: 150 }}>
      {isLogged ? (
        <>
          <Menu.Target>
            <ActionIcon variant="outline" aria-label="Settings" radius="xl">
              <IconUser />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              leftSection={
                <IconUserFilled style={{ width: rem(14), height: rem(14) }} />
              }
              onClick={handleAccount}>
              Mon compte
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
              leftSection={
                <IconMapPins style={{ width: rem(14), height: rem(14) }} />
              }
              onClick={handleTrips}>
              Mes voyages
            </Menu.Item>
            <Menu.Item
              leftSection={
                <IconHistory style={{ width: rem(14), height: rem(14) }} />
              }
              onClick={handleTrips}>
              Historique
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
              leftSection={
                <IconLogout style={{ width: rem(14), height: rem(14) }} />
              }
              onClick={handleLogout}>
              Se déconnecter
            </Menu.Item>
          </Menu.Dropdown>
        </>
      ) : (
        <>
          <Menu.Target>
            <ActionIcon variant="outline" aria-label="Settings" radius="xl">
              <IconLogin />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              onClick={() => navigate("/login")}>
              Se connecter
            </Menu.Item>
            <Menu.Item
              onClick={() => navigate("/register")}>
              S'inscrire
            </Menu.Item>
          </Menu.Dropdown>
        </>
      )}
    </Menu>
  );
};

export default ProfileMenu;
