import { Burger, Button, Group, AppShell, UnstyledButton } from '@mantine/core';
import { IconSquareRoundedPlus, IconLogin } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import ProfileMenu from '../profileMenu/ProfileMenu';
import './DefaultHeader.scss';

interface DefaultHeaderProps {
	burgerOpened: boolean;
	toggleBurgerState: () => void;
}

const DefaultHeader = (props: DefaultHeaderProps) => {
	const isLogged = false;
	const navigate = useNavigate();

	const handleClickLogo = () => {
		navigate('/');
	};

	const handleCreateTrip = () => {
		//TODO: Redirect to create trip page
		console.log('Create trip');
	};

	const handleLogin = () => {
		//TODO: Redirect to login page
		console.log('Login / Register');
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
									Create my trip
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
				<UnstyledButton className="control">Create my trip</UnstyledButton>
				<UnstyledButton className="control">Profil</UnstyledButton>
			</AppShell.Navbar>
		</>
	);
};

export default DefaultHeader;
