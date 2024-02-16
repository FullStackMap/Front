import { useDisclosure } from '@mantine/hooks';
import './styles.scss';
import '@mantine/core/styles.css';
import {
	AppShell,
	rem,
	Text,
	Burger,
	UnstyledButton,
	Group,
} from '@mantine/core';

export default function App() {
	const [opened, { toggle }] = useDisclosure();

	const lorem =
		'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos ullam, ex cum repellat alias ea nemo. Ducimus ex nesciunt hic ad saepe molestiae nobis necessitatibus laboriosam officia, reprehenderit, earum fugiat?';

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
						<div>Logo</div>
						<Group ml="xl" gap={0} visibleFrom="sm">
							<UnstyledButton className="control">Home</UnstyledButton>
							<UnstyledButton className="control">Blog</UnstyledButton>
							<UnstyledButton className="control">Contacts</UnstyledButton>
							<UnstyledButton className="control">Support</UnstyledButton>
						</Group>
					</Group>
				</Group>
			</AppShell.Header>
			<AppShell.Navbar py="md" px={4}>
				<UnstyledButton className="control">Home</UnstyledButton>
				<UnstyledButton className="control">Blog</UnstyledButton>
				<UnstyledButton className="control">Contacts</UnstyledButton>
				<UnstyledButton className="control">Support</UnstyledButton>
			</AppShell.Navbar>

			<AppShell.Main pt={`calc(${rem(60)} + var(--mantine-spacing-md))`}>
				{Array(40)
					.fill(0)
					.map((_, index) => (
						<Text size="lg" key={index} my="md" maw={600} mx="auto">
							{lorem}
						</Text>
					))}
			</AppShell.Main>
			<AppShell.Footer>Footer</AppShell.Footer>
		</AppShell>
	);
}
