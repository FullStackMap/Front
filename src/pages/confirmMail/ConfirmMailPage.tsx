import { ConfirmMailDto } from '@FullStackMap/from-a2b';
import { Center, Loader, Text } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useNotify, { NotifyDto } from '../../hooks/useNotify';
import { useQueryParams } from '../../hooks/useQueryParams';
import { AnoAuthController } from '../../services/BaseApi';

export const ConfirmMailPage = () => {
  const navigate = useNavigate();
  const queryParams = useQueryParams() as { token: string; mail: string };

  const { SuccessNotify, ErrorNotify } = useNotify();

  const confirmMailMutation = useMutation({
    mutationFn: async (dto: ConfirmMailDto) =>
      await AnoAuthController.confirmEmailPOST(dto)
        .then(() => {
          SuccessNotify({
            title: 'Votre requête a bien été prise en compte',
            message:
              'Si un compte est associé à cet email, vous recevrez un email de réinitialisation de mot de passe.',
          } as NotifyDto);
          navigate('/login');
        })
        .catch(() => {
          ErrorNotify({
            title: "Une erreur s'est produite",
            message: "Votre demande n'a pas pu être prise en compte",
          } as NotifyDto);
          navigate('/');
        }),
  });

  useEffect(() => {
    if (!queryParams.token || !queryParams.mail) navigate('/');
    confirmAccount();
  }, [queryParams]);

  const confirmAccount = async () => {
    const confirmMailDto: ConfirmMailDto = {
      token: queryParams.token,
      email: queryParams.mail,
    };
    confirmMailMutation.mutate(confirmMailDto);
  };

  return (
    <Center>
      <Loader />
      <Text size="xl">Confirmation de votre email en cours...</Text>
    </Center>
  );
};
