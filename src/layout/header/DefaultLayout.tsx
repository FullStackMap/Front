import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet } from 'react-router-dom';
import DefaultHeader from '../../components/headers/DefaultHeader';

const DefaultLayout = () => {
	const [opened, { toggle }] = useDisclosure();

	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{
				width: 300,
				breakpoint: 'sm',
				collapsed: { desktop: true, mobile: !opened },
			}}
			footer={{ height: 150 }}
			padding="md">
			<AppShell.Header>
				<DefaultHeader burgerOpened={opened} toggleBurgerState={toggle} />
			</AppShell.Header>

			<AppShell.Main>
				<Outlet />
			</AppShell.Main>
			<AppShell.Footer>Footer</AppShell.Footer>
		</AppShell>
	);
};

export default DefaultLayout;
