import { ForgotPasswordDto } from '@FullStackMap/from-a2b';
import { Button, Modal, Space, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import useNotify, { NotifyDto } from '../../hooks/useNotify';
import { AnoAuthController } from '../../services/BaseApi';

export interface RequestResetPasswordModalProps {
  isOpen: boolean;
  close: () => void;
}

export const RequestResetPasswordModal = (
  props: RequestResetPasswordModalProps,
) => {
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

  const { SuccessNotify } = useNotify();

  const forgotPasswordMutation = useMutation({
    mutationFn: async (dto: ForgotPasswordDto) =>
      await AnoAuthController.forgotPasswordPOST(dto),
    onSuccess: () => {
      SuccessNotify({
        title: 'Votre requête a bien été prise en compte',
        message:
          'Si un compte est associé à cet email, vous recevrez un email de réinitialisation de mot de passe.',
      } as NotifyDto);
      props.close();
    },
    onSettled: () => resetPasswordRequestForm.reset(),
  });

  const handleFromSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!resetPasswordRequestForm.isValid()) return;
    forgotPasswordMutation.mutate(
      resetPasswordRequestForm.values as ForgotPasswordDto,
    );
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
          loading={forgotPasswordMutation.isPending}
          disabled={!resetPasswordRequestForm.isValid()}
          fullWidth>
          Envoyer
        </Button>
      </form>
    </Modal>
  );
};
