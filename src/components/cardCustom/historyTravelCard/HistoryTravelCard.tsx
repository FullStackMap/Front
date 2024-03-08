import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';

export type HistoryTravelCardProps = {
    img: string;
    title: string;
    description: string;

};

export const HistoryTravelCard = (props:HistoryTravelCardProps) => {
    const logtest = (props:HistoryTravelCardProps) => {
        console.log(props);
    }


    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                <Image
                    src={props.img}
                    height={160}
                    alt="Norway"
                />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{props.title}</Text>
                <Badge color="pink">Fini 💔</Badge>
            </Group>

            <Text size="sm" c="dimmed">
                {props.description}
            </Text>
            <Button color="blue" fullWidth mt="md" radius="md" onClick={()=>logtest(props)}>
                Voir Plus
            </Button>
        </Card>
    )
}