import { Card, Text } from '@mantine/core';
const CGU = () => {
    return (
        <Card
            shadow="sm"
            padding="xl"
            component="a"
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
        >
            <Text fw={500} size="lg" mt="md">
                Condition Générale D'utilisation
            </Text>

            <Text mt="xs" c="dimmed" size="sm">
                En utilisant ce site web, vous acceptez les conditions générales d'utilisation énoncées ci-dessous. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser ce site.

                Acceptation des conditions
                En accédant à ce site, vous acceptez d'être lié par ces conditions d'utilisation, toutes les lois et réglementations applicables, et vous acceptez la responsabilité de vous conformer aux lois locales le cas échéant. Si vous n'acceptez pas ces termes, vous êtes interdit d'utiliser ou d'accéder à ce site. Les matériaux contenus dans ce site sont protégés par le droit d'auteur et le droit des marques.

                Utilisation autorisée
                Vous pouvez utiliser ce site uniquement à des fins légales et conformément à ces conditions d'utilisation. Vous acceptez de ne pas utiliser le site à des fins illégales ou interdites par ces termes.

                Propriété intellectuelle
                Le contenu, les logos, les marques de commerce et tout autre matériel sur ce site sont la propriété de [Nom de l'entreprise] ou de ses concédants de licence et sont protégés par les lois sur le droit d'auteur et les marques de commerce.

                Liens vers des tiers
                Ce site peut contenir des liens vers des sites web tiers. Ces liens sont fournis pour votre commodité, mais nous n'avalisons pas le contenu de ces sites et déclinons toute responsabilité quant à leur contenu.

                Modification des conditions
                [Nom de l'entreprise] se réserve le droit de modifier ces conditions d'utilisation à tout moment. Il est de votre responsabilité de vérifier périodiquement les changements. En continuant à utiliser ce site après la publication de modifications, vous acceptez les modifications.

                Limitation de responsabilité
                [Nom de l'entreprise] ne sera en aucun cas responsable des dommages directs, indirects, spéciaux, consécutifs ou accessoires résultant de l'utilisation ou de l'incapacité à utiliser ce site.

                Loi applicable
                Ces conditions d'utilisation sont régies par et interprétées conformément aux lois en vigueur dans [Juridiction]. Vous consentez irrévocablement à la compétence exclusive des tribunaux de [Juridiction] pour résoudre tout litige qui découle de ces conditions d'utilisation.
            </Text>
        </Card>
    )
}
export default CGU;