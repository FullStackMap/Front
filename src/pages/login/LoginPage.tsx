import {
  Anchor,
  Button,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import '@mantine/core/styles.css';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useEffect } from 'react';
import { AuthStore, useAuthStore } from '../../store/useAuthStore';
import classes from './LoginPage.module.css';
import {useDisclosure} from "@mantine/hooks";
import {notifications} from "@mantine/notifications";

export function LoginPage() {
  const login = useAuthStore((s: AuthStore) => s.login);
  const navigate = useNavigate();

  const [
    isLoginButtonLoading,
    {
      toggle: toggleLoginButtonLoading,
      close: disableLoadingButtonLogin,
    },
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
    }catch (e: any) {

      const reponseStatus: number | undefined = e.response.status;
      switch (reponseStatus) {
        case 400:
          console.log("caca");
          break;
        case 401:
          throwErrorNotification();
          break;
        default:
          console.error(
              "Impossible de se connecter au serveur d'authentification"
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
  const throwErrorNotification = ()=>{
    notifications.show({
      title: 'Erreur de connexion',
      message: 'Vôtre mot de passe ou identifiant sont incorrect!',
      color: 'red',
      icon: 'X',
      autoClose: 5000,
    })
  }
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <form onSubmit={handleSubmit} onReset={() => loginForm.reset()}>
          <Title
            order={2}
            className={classes.title}
            ta="center"
            mt="md"
            mb={50}>
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

          <Button
              fullWidth
              mt="xl"
              size="md"
              color="#DDAA00"
              type="submit"
              disabled={isLoginButtonDisabled}
              loading={isLoginButtonLoading}
          >
            Se connecter
          </Button>
        </form>

        <Text ta="center" mt="md">
          <span>
            Vous n'avez pas de compte?
            <br></br>{' '}
          </span>
          <Anchor<'a'> fw={700} onClick={handleRegisterPage}>
            Créer un compte
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}
