import { Button, Flex, Modal, Space } from '@mantine/core';
import useNotify, { NotifyDto } from '../../../hooks/useNotify';
import { useMutation } from '@tanstack/react-query';
import { UserController } from '../../../services/BaseApi';
import { useAuthStore } from '../../../store/useAuthStore';

export interface DeleteFromModalProps {
  isOpen: boolean;
  close: () => void;
}

interface DeleteFormProps {
  userId: string | undefined;
}

export const DeleteFormModal: React.FC<
  DeleteFormProps & DeleteFromModalProps
> = ({ userId, isOpen, close }) => {
  const { SuccessNotify } = useNotify();
  const { logOut } = useAuthStore();

  const deleteUserMutation = useMutation({
    mutationFn: async (id: string) => {
      await UserController.deleteUserByIdDELETE(id);
    },
    onSuccess: () => {
      SuccessNotify({
        title: 'Compte supprimé',
        message: 'Votre compte a été supprimé avec succès',
        autoClose: 5000,
      } as NotifyDto);
      close();
      logOut();
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    deleteUserMutation.mutate(userId!);
  };

  return (
    <Modal
      title="Suppression de compte"
      opened={isOpen}
      onClose={close}
      centered>
      <form onSubmit={handleSubmit}>
        <Flex gap="xl" justify="center">
          <Button type="reset" color="gray.6" onClick={close}>
            Annuler
          </Button>
          <Space h={10} />
          <Button
            type="submit"
            color="red"
            loading={deleteUserMutation.isPending}>
            Supprimer le compte
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};
