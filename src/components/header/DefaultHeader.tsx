import { Burger, Button, Group, AppShell, UnstyledButton } from '@mantine/core';
import {
	IconSquareRoundedPlus,
	IconLogin,
	IconLogout,
	IconUserFilled,
	IconMapPins,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import ProfileMenu from '../profileMenu/ProfileMenu';
import './DefaultHeader.scss';

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

	const handleLogin = () => {
		//TODO: Redirect to login page
		console.log('Login / Register');
	};

	const handleCreateTrip = () => {
		//TODO: Redirect to create trip page
		console.log('Create trip');
	};

	const handleAccount = () => {
		//TODO: Redirect to account page
		console.log('handleAccount');
	};

	const handleTrips = () => {
		//TODO: Redirect to Trips list page
		console.log('handleTrips');
	};

	const handleLogout = () => {
		//TODO: Redirect to logout page
		console.log('handleLogout');
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
						{isLogged ? (
							<>
								<Button
									mr="sm"
									leftSection={<IconSquareRoundedPlus size={14} />}
									variant="default"
									onClick={handleCreateTrip}>
									Créer mon voyage
								</Button>
								<ProfileMenu />
							</>
						) : (
							<Button
								leftSection={<IconLogin />}
								variant="default"
								onClick={handleLogin}>
								Login / Register
							</Button>
						)}
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
