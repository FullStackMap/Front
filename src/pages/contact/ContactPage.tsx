import {
  Button,
  Container,
  Group,
  Paper,
  SimpleGrid,
  Text,
  TextInput,
  Textarea,
} from '@mantine/core';
import { ContactIconsList } from './ContactIconsList';
import './ContactPage.scss';

const ContactPage = () => {
  return (
    <Container>
      <Paper shadow="md" radius="lg">
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
                <TextInput label="Votre nom" placeholder="Votre nom" />
                <TextInput
                  label="Votre email"
                  placeholder="hello@mantine.dev"
                  required
                />
              </SimpleGrid>
              <TextInput
                mt="md"
                label="Sujet"
                placeholder="Sujet de votre message"
                required
              />
              <Textarea
                mt="md"
                label="Votre message"
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
