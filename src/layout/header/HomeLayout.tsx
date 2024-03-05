import {
  Box,
  Burger,
  Button,
  Divider,
  Drawer,
  Group,
  ScrollArea,
  rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet } from 'react-router-dom';
import { LoginDto } from '../../Models/Auth/LoginDto';
import { useAuthStore } from '../../store/useAuthStore';
import classes from './HeaderMegaMenu.module.css';

const HomeLayout = () => {
  const authStore = useAuthStore();

  const handleClickLogin: () => Promise<void> = async () => {
    const loginDto: LoginDto = {
      Username: 'Dercraker',
      Password: 'NMdRx$HqyT8jX6',
    };

    authStore.login(loginDto);
  };

  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  return (
    <div>
      <Box pb={120}>
        <header className={classes.header}>
          <Group justify="space-between" h="100%">
            <Group h="100%" gap={0} visibleFrom="sm">
              <a href="#" className={classes.link}>
                Accueil
              </a>

              <a href="#" className={classes.link}>
                Profil
              </a>
              <a href="#" className={classes.link}>
                Voyage
              </a>
            </Group>

            <Group visibleFrom="sm">
              <Button variant="default" onClick={handleClickLogin}>
                Se connecter
              </Button>
            </Group>

            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              hiddenFrom="sm"
            />
          </Group>
        </header>

        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          size="100%"
          padding="md"
          title="Navigation"
          hiddenFrom="sm"
          zIndex={1000000}>
          <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
            <Divider my="sm" />

            <a href="#" className={classes.link}>
              Accueil
            </a>
            <a href="#" className={classes.link}>
              Apprendre
            </a>
            <a href="#" className={classes.link}>
              Académie
            </a>

            <Divider my="sm" />

            <Group justify="center" grow pb="xl" px="md">
              <Button variant="default">Se connecter</Button>
            </Group>
          </ScrollArea>
        </Drawer>
      </Box>
      <Outlet />
    </div>
  );
};

export default HomeLayout;
