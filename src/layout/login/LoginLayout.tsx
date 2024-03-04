import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import DefaultFooter from '../../components/footer/DefaultFooter';
import LoginHeader from '../../components/header/LoginHeader';

const LoginLayout = () => {
  return (
    <AppShell header={{ height: 60 }} footer={{ height: 120 }} padding="md">
      <AppShell.Header>
        <LoginHeader />
      </AppShell.Header>
      <AppShell.Main>
        <div className="MainContainer">
          <Outlet />
        </div>
      </AppShell.Main>
      <AppShell.Footer>
        <DefaultFooter />
      </AppShell.Footer>
    </AppShell>
  );
};

export default LoginLayout;
