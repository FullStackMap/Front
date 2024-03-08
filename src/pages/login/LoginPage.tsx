/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Anchor,
  Button,
  Container,
  PasswordInput,
  Space,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import '@mantine/core/styles.css';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { zodResolver } from 'mantine-form-zod-resolver';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { RequestResetPasswordModal } from '../../components/passwordReset/RequestResetPasswordModal';
import { AuthStore, useAuthStore } from '../../store/useAuthStore';

export function LoginPage() {
  const login = useAuthStore((s: AuthStore) => s.login);
  const navigate = useNavigate();

  const [
    resetPasswordRequestModalIsOpen,
    { toggle: toggleResetPasswordRequestModalIsOpen },
  ] = useDisclosure(false);

  const [
    isLoginButtonLoading,
    { toggle: toggleLoginButtonLoading, close: disableLoadingButtonLogin },
  ] = useDisclosure(false);
  const [isLoginButtonDisabled, { toggle: toggleLoginButtonDisabled }] =
    useDisclosure(false);

  const loginSchema = z.object({
    email: z.string().email('Un email valid est requis'),
    password: z.string().min(1, 'Le mot de passe est requis'),
  });

  const loginForm = useForm({
    validateInputOnChange: true,
    initialValues: {
      email: '',
      password: '',
    },
    validate: zodResolver(loginSchema),
  });

  useEffect(() => {
    toggleLoginButtonDisabled();
  }, [loginForm.isValid()]);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toggleLoginButtonLoading();
    try {
      await login(loginForm.values);
    } catch (e: any) {
      const responseStatus: number | undefined = e.response.status;
      switch (responseStatus) {
        case 400:
          console.log('caca');
          break;
        case 401:
          throwErrorNotification();
          break;
        default:
          console.error(
            "Impossible de se connecter au serveur d'authentification",
          );
          break;
      }
      disableLoadingButtonLogin();
    }
  };

  const handleRegisterPage = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigate('/register');
  };
  const throwErrorNotification = () => {
    notifications.show({
      title: 'Erreur de connexion',
      message: 'Votre mot de passe ou identifiant sont incorrect!',
      color: 'red',
      icon: 'X',
      autoClose: 5000,
    });
  };
  return (
    <>
      <Container>
        <form onSubmit={handleSubmit} onReset={() => loginForm.reset()}>
          <Title order={2} ta="center">
            Se Connecter
          </Title>

          <TextInput
            label="Email"
            placeholder="exemple@gmail.com"
            size="md"
            {...loginForm.getInputProps('email')}
          />

          <PasswordInput
            label="Mot de passe"
            placeholder="Votre mot de passe"
            mt="md"
            size="md"
            {...loginForm.getInputProps('password')}
          />
          <Anchor<'a'> fw={700} onClick={toggleResetPasswordRequestModalIsOpen}>
            Mot de passe oublier ?
          </Anchor>

          <Button
            fullWidth
            size="md"
            mt="xl"
            color="#DDAA00"
            type="submit"
            disabled={isLoginButtonDisabled}
            loading={isLoginButtonLoading}>
            Se connecter
          </Button>
        </form>

        <Space h="lg" />

        <Stack gap="xs">
          <Text ta="center" mt="md">
            <span>Vous n'avez pas de compte?</span>
            <Space h="xs" />
            <Anchor<'a'> fw={700} onClick={handleRegisterPage}>
              Créer un compte
            </Anchor>
          </Text>
        </Stack>
      </Container>
      <RequestResetPasswordModal
        isOpen={resetPasswordRequestModalIsOpen}
        close={toggleResetPasswordRequestModalIsOpen}
      />
    </>
  );
}
