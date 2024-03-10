import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import moment from "moment";

export type HistoryTravelCardProps = {
    img: string;
    title: string;
    description: string;
    id: string;
    startDate: string;
};

export const CurrentTravelCard = (props:HistoryTravelCardProps) => {
    const logtest = (props:HistoryTravelCardProps) => {
        console.log(props.id);
    }

    const isInProgress = (startDate: string) => {
        const currentDate = moment().format("DD");
        const tripStartDate = moment(startDate).format("DD");

        if (currentDate >= tripStartDate) return "En cours 🕐"
        return "A venir 💕"
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
                <Badge color="pink">{isInProgress(props.startDate)}</Badge>
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