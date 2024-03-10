import { Card, Text, Image } from '@mantine/core';


const NoFoundTravels=()=> {
    return (
        <Card withBorder shadow="sm" radius="md">

            <Text mt="sm" c="dimmed" size="sm">
                Vous avez actuellement aucun voyage prévue ou en cours 🥲
            </Text>

            <Card.Section mt="sm">
                <Image src="https://img.lemde.fr/2020/08/06/0/153/2480/1653/1440/960/60/0/8214e3b_835252256-dossier_univ_shanghai_2020_bonhomme_05-copie.jpg" />
            </Card.Section>

            <Card.Section inheritPadding mt="sm" pb="md">
              <button>Créer un nouveau voyage 😍</button>
            </Card.Section>
        </Card>
    );
}

export default NoFoundTravels;