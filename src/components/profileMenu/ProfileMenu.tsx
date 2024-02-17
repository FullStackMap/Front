import { Menu, rem, ActionIcon } from '@mantine/core';
import {
	IconUserFilled,
	IconLogout,
	IconUser,
	IconMapPins,
	IconLogin,
	IconHistory,
} from '@tabler/icons-react';

interface ProfileMenuProps {
	isLogged: boolean;
}

const ProfileMenu = (props: ProfileMenuProps) => {
	const handleAccount = () => {
		console.log('Mon compte');
	};

	const handleTrips = () => {
		console.log('Mes voyages');
	};

	const handleLogout = () => {
		console.log('Se déconnecter');
	};

	return (
		<Menu
			trigger="click-hover"
			openDelay={100}
			closeDelay={400}
			shadow="md"
			width={200}
			transitionProps={{ transition: 'skew-up', duration: 150 }}>
			{props.isLogged ? (
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
							// leftSection={
							// 	<IconLogin style={{ width: rem(14), height: rem(14) }} />
							// }
							onClick={handleAccount}>
							Se connecter
						</Menu.Item>
						<Menu.Item
							// leftSection={
							// 	<IconMapPins style={{ width: rem(14), height: rem(14) }} />
							// }
							onClick={handleTrips}>
							S'inscrire
						</Menu.Item>
					</Menu.Dropdown>
				</>
			)}
		</Menu>
	);
};

export default ProfileMenu;
