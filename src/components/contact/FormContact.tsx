import { Button, Group, SimpleGrid, Text, TextInput, Textarea } from "@mantine/core";

const FormContact = () => {
    return (
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
    )
};

export default FormContact;
