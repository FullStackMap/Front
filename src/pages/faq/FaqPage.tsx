import { Accordion, Container, Paper, Title } from '@mantine/core';

const FaqPage = () => {
  return (
    <Container ta="center" size="md">
      <Paper shadow="lg" mt="xl" p="xl">
        <Title order={1} mb="lg">
          Foire aux questions
        </Title>
        <Accordion variant="separated">
          <Accordion.Item value="reset-password">
            <Accordion.Control>
              Comment réinitialiser mon mot de passe ?
            </Accordion.Control>
            <Accordion.Panel>
              Pour réinitialiser votre mot de passe, cliquez sur le lien "Mot de
              passe oublié ?" sur la page de connexion. Vous recevrez un e-mail
              avec des instructions pour réinitialiser votre mot de passe.
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="another-account">
            <Accordion.Control>
              Puis-je créer plus d'un compte ?
            </Accordion.Control>
            <Accordion.Panel>
              Non, vous ne pouvez créer qu'un seul compte par adresse e-mail. Si
              vous avez besoin d'aide pour accéder à votre compte, veuillez
              contacter notre équipe d'assistance.
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="newsletter">
            <Accordion.Control>Comment créer mon voyage ?</Accordion.Control>
            <Accordion.Panel>
              Pour créer votre voyage, veuillez vous connecter à votre compte et
              cliquer sur "Créer un voyage". Vous pourrez ensuite ajouter des
              destinations, des dates et des activités à votre voyage.
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="credit-card">
            <Accordion.Control>
              Comment supprimer mon compte ?
            </Accordion.Control>
            <Accordion.Panel>
              Pour supprimer votre compte, veuillez contacter notre équipe
              d'assistance. Nous serons heureux de vous aider à supprimer votre
              compte.
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="payment">
            <Accordion.Control>
              Mes données personnelles sont-elles sécurisées ?
            </Accordion.Control>
            <Accordion.Panel>
              Oui, nous prenons la sécurité de vos données personnelles très au
              sérieux. Nous utilisons des mesures de sécurité avancées pour
              protéger vos informations personnelles.
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Paper>
    </Container>
  );
};

export default FaqPage;
