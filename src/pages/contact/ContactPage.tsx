import {
  Button,
  Container,
  Group,
  Paper,
  SimpleGrid,
  Text,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core';
import { ContactIconsList } from './ContactIconsList';
import './ContactPage.scss';

const ContactPage = () => {
  return (
    <Container>
      <Title order={1} mb="lg" ta="center" mt="lg">
        Contactez-nous
      </Title>
      <Paper shadow="md" radius="lg" mt="xl" p="xl">
        <div className="contact">
          <div className="contact__contacts">
            <Text className="contact__title" fz="lg" fw={700} c="#fff">
              Information de contact
            </Text>
            <ContactIconsList />
          </div>
          <form
            className="contact__form"
            onSubmit={(event) => event.preventDefault()}>
            <Text className="contact__title" fz="lg" fw={700}>
              Envoyez-nous un message
            </Text>
            <div className="contact__fields">
              <SimpleGrid cols={{ base: 1, sm: 2 }}>
                <TextInput label="Nom" placeholder="Votre nom" />
                <TextInput label="Email" placeholder="Votre email" required />
              </SimpleGrid>
              <TextInput
                mt="md"
                label="Sujet"
                placeholder="Sujet de votre message"
                required
              />
              <Textarea
                mt="md"
                label="Message"
                placeholder="Merci de nous laisser un message"
                minRows={3}
                resize="both"
              />
              <Group justify="flex-end" mt="md">
                <Button className="contact__control" type="submit">
                  Envoyer
                </Button>
              </Group>
            </div>
          </form>
        </div>
      </Paper>
    </Container>
  );
};
export default ContactPage;
