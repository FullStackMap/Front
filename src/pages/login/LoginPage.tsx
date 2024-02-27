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
import React, { useState } from 'react';
import classes from './LoginPage.module.css';

// ... autres imports
export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string>('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredEmail = event.target.value;
    setEmail(enteredEmail);

    // Validation de l'email à chaque changement
    const isValidEmail = validateEmail(enteredEmail);

    if (!isValidEmail) {
      setEmailError('Veuillez entrer un email valide');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    // Validation de l'email
    const isValidEmail = validateEmail(email);

    if (!isValidEmail) {
      setEmailError('Veuillez entrer un email valide');
      return;
    }

    // Autres traitements de connexion ici
    // ...
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Se Connecter
        </Title>

        <TextInput
          label="Email"
          placeholder="exemple@gmail.com"
          size="md"
          value={email}
          onChange={handleEmailChange}
          error={emailError}
        />

        <PasswordInput
          label="Mot de passe"
          placeholder="Votre mot de passe"
          mt="md"
          size="md"
          value={password}
          onChange={handlePasswordChange}
        />

        <Checkbox label="Se souvenir de moi" mt="xl" size="md" />

        <Button
          fullWidth
          mt="xl"
          size="md"
          onClick={handleLogin}
          color="#DDAA00">
          Se connecter
        </Button>

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
