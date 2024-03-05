import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import LoginHeader from '../../components/header/LoginHeader';

const LoginLayout = () => {
  return (
    <AppShell header={{ height: 60 }}>
      <AppShell.Header>
        <LoginHeader />
      </AppShell.Header>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default LoginLayout;
