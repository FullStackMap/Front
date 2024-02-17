import { Menu, rem, ActionIcon } from '@mantine/core';
import {
	IconUserFilled,
	IconSquareRoundedPlus,
	IconLogout,
	IconUser,
} from '@tabler/icons-react';

const ProfileMenu = () => {
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
				<Menu.Item
					leftSection={
						<IconSquareRoundedPlus
							style={{ width: rem(14), height: rem(14) }}
						/>
					}
					onClick={handleTrips}>
					Mes voyages
				</Menu.Item>
				<Menu.Item
					leftSection={
						<IconLogout style={{ width: rem(14), height: rem(14) }} />
					}
					onClick={handleLogout}>
					Se déconnecter
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
};

export default ProfileMenu;
