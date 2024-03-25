import { Container, Paper, Text, Title } from '@mantine/core';
import { ContactIconsList } from '../../components/contact/ContactIconsList';
import { FormContact } from '../../components/contact/FormContact';
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
          <FormContact />
        </div>
      </Paper>
    </Container>
  );
};
export default ContactPage;
