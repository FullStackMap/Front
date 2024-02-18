import {
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './HeaderMegaMenu.module.css';
import { Outlet } from 'react-router-dom';
import { LoginDto } from '../../Models/Auth/LoginDto';
import { AuthController } from '../../services/api/AuthController';
import { useAuth, AuthProvider, LocalStorageProvider } from "@reactivers/hooks";


const HomeLayout = () => {

  const auth = useAuth();

  const handleClickLogin = async () => {
    const loginDto: LoginDto = { Username: "Dercraker", Password: "NMdRx$HqyT8jX6" }
    await AuthController.LoginAsync(loginDto)
  }


  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  return (
  <div>
    <Box pb={120}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">

          <Group h="100%" gap={0} visibleFrom="sm">
            <a href="#" className={classes.link}>
              Acceuil
            </a>
    
            <a href="#" className={classes.link}>
              Profile
            </a>
            <a href="#" className={classes.link}>
              Travel
            </a>
          </Group>

          <Group visibleFrom="sm">
            <Button variant="default" onClick={handleClickLogin}>Log in</Button>
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <a href="#" className={classes.link}>
            Home
          </a>
          <a href="#" className={classes.link}>
            Learn
          </a>
          <a href="#" className={classes.link}>
            Academy
          </a>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Button variant="default">Log in</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
    <Outlet/>
  </div>
  );
}

export default HomeLayout;