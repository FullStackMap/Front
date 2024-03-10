import { Title, Text, Container, Button, Overlay } from '@mantine/core'
import './HeroImageBackground.scss'

const HeroImageBackground = () => {
  return (
    <div className="hero__wrapper">
      <Overlay color="#000" opacity={0.65} zIndex={1} />

      <div className="hero__inner">
        <Title className="hero__title">Créez votre voyage de rêve</Title>

        <Container size={640}>
          <Text size="lg" className="hero__description">
            Explorez, planifiez et réservez votre prochaine aventure
          </Text>
        </Container>

        <div className="hero__controls">
          <Button
            className="hero__control"
            variant="outline"
            color="white"
            size="lg"
          >
            Commencer
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HeroImageBackground
