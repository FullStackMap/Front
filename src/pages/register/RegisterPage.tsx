import { RegisterDto } from '@FullStackMap/from-a2b';
import { Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import { zodResolver } from 'mantine-form-zod-resolver';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { AnoAuthController } from '../../services/BaseApi';

export const RegisterPage = () => {
  const navigate = useNavigate();

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

  const registerUser = useCallback(async (registerDto: RegisterDto) => {
    await AnoAuthController.registerPOST(registerDto)
      .then(res => {
        console.log(res);
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
        err;
        console.log('🚀 ~ registerUser ~ err:', err.response.data);
        console.log();
        err.response.data.map(data => {
          notifications.show({
            title: "Erreur dans l'inscription",
            message: data.message,
            autoClose: 10000,
            color: 'red',
            icon: <IconX />,
          });
        });
      });
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (registerFrom.isValid()) registerUser(registerFrom.values);
  };

  const handleShowNotif = () => {
    notifications.show({
      title: 'Enregistrement réussi',
      message: 'Hey there, your code is awesome! 🤥',
      autoClose: 5000,
      color: 'teal',
      icon: <IconCheck />,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} onReset={() => registerFrom.reset()}>
        <TextInput
          label="Identifiant"
          placeholder="Identifiant"
          size="md"
          {...registerFrom.getInputProps('username')}
        />

        <TextInput
          label="Email"
          placeholder="exemple@gmail.com"
          size="md"
          {...registerFrom.getInputProps('email')}
        />

        <TextInput
          label="Mot de passe"
          placeholder="Votre mot de passe"
          mt="md"
          size="md"
          {...registerFrom.getInputProps('password')}
        />
        <TextInput
          label="Confirmation de mot de passe"
          placeholder="Confirmation de mot de passe"
          mt="md"
          size="md"
          {...registerFrom.getInputProps('confirmPassword')}
        />

        <Button fullWidth mt="xl" size="md" color="#DDAA00" type="submit">
          S'inscrire
        </Button>
      </form>
      <Button onClick={handleShowNotif}>notif</Button>
    </>
  );
};
