import { ForgotPasswordDto } from '@FullStackMap/from-a2b';
import { Button, Modal, Space, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import { AnoAuthController } from '../../services/BaseApi';

export interface RequestResetPasswordModalProps {
  isOpen: boolean;
  close: () => void;
}

export const RequestResetPasswordModal = (
  props: RequestResetPasswordModalProps,
) => {
  const [
    isRequestResetPasswordButtonLoading,
    {
      toggle: toggleRequestResetPasswordLoading,
      close: disableRequestResetPasswordLoading,
    },
  ] = useDisclosure(false);

  const resetPasswordRequestSchema = z.object({
    email: z.string().email('Un email valide est requis'),
  });

  const resetPasswordRequestForm = useForm({
    validateInputOnChange: true,
    initialValues: {
      email: '',
    },
    validate: zodResolver(resetPasswordRequestSchema),
  });

  const successNotification = () => {
    notifications.show({
      title: 'Votre requête a bien été prise en compte',
      message:
        'Si un compte est associé à cet email, vous recevrez un email de réinitialisation de mot de passe.',
      autoClose: 5000,
      color: 'teal',
      icon: <IconCheck />,
    });
  };

  const errorNotification = (message: string) =>
    notifications.show({
      title: "Une erreur s'est produite",
      message: message,
      autoClose: 2000,
      color: 'red',
      icon: <IconX />,
    });

  const handleFromSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!resetPasswordRequestForm.isValid()) return;
    toggleRequestResetPasswordLoading();
    try {
      await AnoAuthController.forgotPasswordPOST(
        resetPasswordRequestForm.values as ForgotPasswordDto,
      );
      successNotification();
      props.close();
    } catch (e: any) {
      const responseStatus: number | undefined = e.response.status;
      switch (responseStatus) {
        case 400:
          e.response.data
            .map((data: any) => data.message)
            .forEach((message: string) => {
              errorNotification(message);
            });
          break;
        case 404:
          successNotification();
          props.close();
          break;
        default:
          console.error(
            "Impossible de se connecter au serveur d'authentification",
          );
          notifications.show({
            title: "Une erreur s'est produite",
            message: 'Merci de réessayer plus tard',
            autoClose: 2000,
            color: 'red',
            icon: <IconX />,
          });
          break;
      }
    } finally {
      disableRequestResetPasswordLoading();
      resetPasswordRequestForm.reset();
    }
  };

  return (
    <Modal
      opened={props.isOpen}
      onClose={props.close}
      title="Réinitialisation de mot de passe"
      centered>
      <form
        onSubmit={handleFromSubmit}
        onReset={() => resetPasswordRequestForm.reset()}>
        <TextInput
          label="Email"
          placeholder="Veuillez renseignez votre email"
          required
          {...resetPasswordRequestForm.getInputProps('email')}
        />
        <Space h={10} />
        <Button
          type="submit"
          loading={isRequestResetPasswordButtonLoading}
          disabled={!resetPasswordRequestForm.isValid()}
          fullWidth>
          Envoyer
        </Button>
      </form>
    </Modal>
  );
};
