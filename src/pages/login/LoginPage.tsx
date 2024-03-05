import { LoginDto } from '@FullStackMap/from-a2b';
import {
  Anchor,
  Button,
  Checkbox,
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
import { z } from 'zod';
import { AuthStore, useAuthStore } from '../../store/useAuthStore';
import classes from './LoginPage.module.css';

export function LoginPage() {
  const login = useAuthStore((s: AuthStore) => s.login);

  const loginSchema = z.object({
    email: z.string().email('Un email valid est requis'),
    password: z.string().min(8, {
      message: 'Le mot de passe doit faire au minimum 8 caractères',
    }),
  });

  const loginForm = useForm({
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

          <Checkbox label="Se souvenir de moi" mt="xl" size="md" />

          <Button fullWidth mt="xl" size="md" color="#DDAA00" type="submit">
            Se connecter
          </Button>
        </form>

        <Text ta="center" mt="md">
          <span>
            Vous n'avez pas de compte?
            <br></br>{' '}
          </span>
          <Anchor<'a'>
            href="#"
            fw={700}
            onClick={event => event.preventDefault()}>
            Créer un compte
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}

export default LoginPage;
