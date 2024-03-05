import { LoginDto } from '@FullStackMap/from-a2b';
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
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { AuthStore, useAuthStore } from '../../store/useAuthStore';
import classes from './LoginPage.module.css';

export function LoginPage() {
  const login = useAuthStore((s: AuthStore) => s.login);
  const navigate = useNavigate();

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

  const loginUser = useCallback(async (loginDto: LoginDto) => {
    await login(loginDto);
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginUser(loginForm.values);
  };

  const handleRegisterPage = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigate('/register');
  };

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

          <Button fullWidth mt="xl" size="md" color="#DDAA00" type="submit">
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

export default LoginPage;
