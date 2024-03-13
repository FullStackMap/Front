import { RegisterDto } from '@FullStackMap/from-a2b';
import {
  Anchor,
  Button,
  Container,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import { zodResolver } from 'mantine-form-zod-resolver';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { AnoAuthController } from '../../services/BaseApi';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [
    isRegisterButtonLoading,
    {
      toggle: toggleRegisterButtonLoading,
      close: disableLoadingButtonRegister,
    },
  ] = useDisclosure(false);
  const [isRegisterButtonDisabled, { toggle: toggleRegisterButtonDisabled }] =
    useDisclosure(false);

  const registerSchema = z
    .object({
      username: z
        .string()
        .min(1, `l'identifiant est requis`)
        .regex(/^[a-zA-Z0-9\-._]+$/, {
          message:
            "Le nom d'utilisateur doit contenir uniquement les caractères a-z, A-Z, 0-9, -, . et _",
        }),
      email: z.string().email("l'email n'est pas valide"),
      password: z
        .string()
        .min(8, 'le mot de passe doit contenir au moins 8 caractères')
        .refine(
          (value: string) => new Set(value).size >= 4,
          'Le mot de passe doit contenir au moins 4 caractères uniques',
        )
        .refine(
          (value: string) => /[^0-9a-zA-Z]/.test(value),
          'Le mot de passe doit contenir au moins un caractère spécial',
        )
        .refine(
          (value: string) => /[0-9]/.test(value),
          'Le mot de passe doit contenir au moins un chiffre',
        )
        .refine(
          (value: string) => /[A-Z]/.test(value),
          'Le mot de passe doit contenir au moins une majuscule',
        )
        .refine(
          (value: string) => /[a-z]/.test(value),
          'Le mot de passe doit contenir au moins une minuscule',
        ),

      confirmPassword: z.string(),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: 'Les mots de passe ne correspondent pas',
      path: ['confirmPassword'],
    });

  const registerFrom = useForm({
    validateInputOnChange: true,
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: zodResolver(registerSchema),
  });

  useEffect(() => {
    toggleRegisterButtonDisabled();
  }, [registerFrom.isValid()]);

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    toggleRegisterButtonLoading();

    if (!registerFrom.isValid()) return;

    await AnoAuthController.registerPOST(registerFrom.values as RegisterDto)
      .then(() => {
        notifications.show({
          title: 'Enregistrement réussi',
          message:
            'Vous allez recevoir un email de confirmation pour activer votre compte',
          autoClose: 5000,
          color: 'teal',
          icon: <IconCheck />,
        });
        navigate('/');
      })
      .catch(err => {
        disableLoadingButtonRegister();

        err.response.data
          .map((data: any) => data.message)
          .forEach((message: string) => {
            notifications.show({
              title: "Erreur dans l'inscription",
              message: message,
              autoClose: 5000,
              color: 'red',
              icon: <IconX />,
            });
          });
      });
  };

  return (
    <form onReset={() => registerFrom.reset()}>
      <Container>
        <Title order={2} ta="center">
          Créer mon compte
        </Title>
        <Text ta="center" c="dimmed">
          Veuillez remplir les champs ci-dessous pour bénéficier de nos services
        </Text>
        <TextInput
          label="Identifiant"
          placeholder="Identifiant"
          size="md"
          {...registerFrom.getInputProps('username')}
        />
        <TextInput
          label="Email"
          placeholder="exemple@gmail.com"
          mt="md"
          size="md"
          {...registerFrom.getInputProps('email')}
        />
        <PasswordInput
          label="Mot de passe"
          placeholder="Votre mot de passe"
          mt="md"
          size="md"
          {...registerFrom.getInputProps('password')}
        />
        <PasswordInput
          label="Confirmation de mot de passe"
          placeholder="Confirmation de mot de passe"
          mt="md"
          size="md"
          {...registerFrom.getInputProps('confirmPassword')}
        />
        <Text ta="center" mt="md">
          Vous possédez déjà un compte?
          <br />
          <Anchor<'a'> fw={700} onClick={() => navigate('/login')}>
            Connectez-vous
          </Anchor>
        </Text>
        <Button
          fullWidth
          mt="xl"
          size="md"
          disabled={isRegisterButtonDisabled}
          loading={isRegisterButtonLoading}
          onClick={handleSubmit}>
          S'inscrire
        </Button>
      </Container>
    </form>
  );
};
