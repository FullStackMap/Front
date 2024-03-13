import { Button, Container } from '@mantine/core';

export const ChangePasswordForm = () => {
  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    throw new Error('Not implemented and send just the email of current user');
  };

  return (
    <Container mx="auto" ta="center">
      <form onSubmit={handleSubmit}>
        <Button type="submit" color="teal">
          Reinitialisation du mot de passe
        </Button>
      </form>
    </Container>
  );
};
