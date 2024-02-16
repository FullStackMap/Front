import { useDisclosure } from '@mantine/hooks';
import './styles.scss';
import '@mantine/core/styles.css';
import {
	AppShell,
	Burger,
	UnstyledButton,
	Group,
	ActionIcon,
	Button,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import { IconSquareRoundedPlus } from '@tabler/icons-react';

export default function App() {
	const [opened, { toggle }] = useDisclosure();

	const navigate = useNavigate();

	const handleClickLogo = () => {
		navigate('/');
	};

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
				<Group h="100%" px="md">
					<Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
					<Group justify="space-between" style={{ flex: 1 }}>
						<img
							src="/public/vite.svg"
							alt="Logo du site"
							onClick={handleClickLogo}
						/>
						<Group ml="xl" gap={0} visibleFrom="sm">
							<Button
								leftSection={<IconSquareRoundedPlus size={14} />}
								variant="default">
								Créer mon voyage
							</Button>
							<ActionIcon variant="outline" aria-label="Settings" radius="xl">
								<User />
							</ActionIcon>
						</Group>
					</Group>
				</Group>
			</AppShell.Header>
			<AppShell.Navbar py="md" px={4}>
				<UnstyledButton className="control">Créer mon voyage</UnstyledButton>
				<UnstyledButton className="control">Profil</UnstyledButton>
			</AppShell.Navbar>

			<AppShell.Main>MAIN</AppShell.Main>
			<AppShell.Footer>Footer</AppShell.Footer>
		</AppShell>
	);
}
