import { LoginDto } from '@FullStackMap/from-a2b';
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
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from 'mantine-form-zod-resolver';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { RequestResetPasswordModal } from '../../components/passwordReset/RequestResetPasswordModal';
import useNotify, { NotifyDto } from '../../hooks/useNotify';
import { AuthStore, useAuthStore } from '../../store/useAuthStore';

export function LoginPage() {
  const login = useAuthStore((s: AuthStore) => s.login);
  const navigate = useNavigate();

  const { ErrorNotify, SuccessNotify } = useNotify();

  const [
    resetPasswordRequestModalIsOpen,
    { toggle: toggleResetPasswordRequestModalIsOpen },
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

  const loginMutation = useMutation({
    mutationFn: async (dto: LoginDto) =>
      await login(dto).catch(() => {
        ErrorNotify({
          title: 'Erreur de connexion',
          message: 'Votre mot de passe ou identifiant sont incorrect!',
        } as NotifyDto);
      }),
    onSuccess: () => {
      SuccessNotify({
        title: 'Connexion réussie',
        message: 'Vous êtes maintenant connecté!',
      } as NotifyDto);
    },
  });

  useEffect(() => {
    toggleLoginButtonDisabled();
  }, [loginForm.isValid()]);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginMutation.mutate(loginForm.values);
  };

  const handleRegisterPage = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigate('/register');
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
            loading={loginMutation.isPending}>
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
