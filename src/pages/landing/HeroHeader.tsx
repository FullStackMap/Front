import { Title, Text, Container, Button, Overlay } from '@mantine/core';
import classes from './HeroImageBackground.module.scss';

export function HeroImageBackground() {
  return (
    <div className={classes.wrapper}>
      <Overlay color="#000" opacity={0.65} zIndex={1} />

      <div className={classes.inner}>
        <Title className={classes.title}>Créez votre voyage de rêve</Title>

        <Container size={640}>
          <Text size="lg" className={classes.description}>
            Explorez, planifiez et réservez votre prochaine aventure
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button
            className={classes.control}
            variant="outline"
            color="white"
            size="lg">
            Commencer
          </Button>
        </div>
      </div>
    </div>
  );
}
