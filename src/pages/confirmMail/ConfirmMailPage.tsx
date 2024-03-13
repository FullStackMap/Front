import { ConfirmMailDto } from '@FullStackMap/from-a2b';
import { Center, Loader, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryParams } from '../../hooks/useQueryParams';
import { AnoAuthController } from '../../services/BaseApi';

export const ConfirmMailPage = () => {
  const navigate = useNavigate();
  const queryParams = useQueryParams() as { token: string; mail: string };

  useEffect(() => {
    if (!queryParams.token || !queryParams.mail) navigate('/');
    confirmAccount();
  }, [queryParams]);

  const confirmAccount = async () => {
    const confirmMailDto: ConfirmMailDto = {
      token: queryParams.token,
      email: queryParams.mail,
    };
    await AnoAuthController.confirmEmailPOST(confirmMailDto)
      .then(() => {
        notifications.show({
          title: 'Votre requête a bien été prise en compte',
          message:
            'Si un compte est associé à cet email, vous recevrez un email de réinitialisation de mot de passe.',
          autoClose: 5000,
          color: 'teal',
          icon: <IconCheck />,
        });
        // navigate('/login');
      })
      .catch(error => {
        console.error(error);
        notifications.show({
          title: "Une erreur s'est produite",
          message: "Votre demande n'a pas pu être prise en compte",
          autoClose: 5000,
          color: 'red',
          icon: <IconX />,
        });
        // navigate('/');
      });
  };

  return (
    <Center>
      <Loader />
      <Text size="xl">Confirmation de votre email en cours...</Text>
    </Center>
  );
};
