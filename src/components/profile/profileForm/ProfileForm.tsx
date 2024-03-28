import { useForm } from '@mantine/form';
import { TextInput, Button, Container, Group } from '@mantine/core';
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import useNotify from '../../../hooks/useNotify';
import { AuthUser } from '../../../services/api/Models/Auth/AuthUser';
import { UserController } from '../../../services/BaseApi';
import { useMutation } from '@tanstack/react-query';
import { UpdateUserNameDto } from '@FullStackMap/from-a2b';

interface ProfileFormProps {
  user: AuthUser | undefined;
}

export const ProfileForm = (props: ProfileFormProps) => {
  const { SuccessNotify } = useNotify();

  const profileSchema = z.object({
    userName: z.string().min(2),
    email: z.string().email(),
  });

  const profileform = useForm({
    validateInputOnChange: true,
    initialValues: {
      userName: props.user?.User,
      email: props.user?.Email,
    },

    validate: zodResolver(profileSchema),
  });

  const changeProfileMutation = useMutation({
    mutationFn: async ([id, dto]: [string, UpdateUserNameDto]) => {
      await UserController.updateUserNamePATCH(id, dto);
    },
    onSuccess: () => {
      SuccessNotify({
        title: 'Profil modifié',
        message: 'Votre profil a été modifié avec succès',
        autoClose: 5000,
      });
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!profileform.isValid()) return;
    if(!props.user?.Id) return;
    changeProfileMutation.mutate([
      props.user?.Id,
      { userName: profileform.values.userName } as UpdateUserNameDto,
    ]);
  };

  return (
    <Container mx="auto">
      <form onSubmit={handleSubmit} onReset={() => profileform.reset()}>
        <TextInput
          label="Nom"
          placeholder="Nom"
          required
          value={props.user?.User}
          {...profileform.getInputProps('userName')}
        />
        <TextInput
          disabled
          mt="sm"
          label="Email"
          placeholder="Email"
          required
          value={props.user?.Email}
          {...profileform.getInputProps('email')}
        />
        <Group justify="flex-end" mt="md">
          <Button type="submit" mt="sm" disabled={!profileform.isValid()}>
            Sauvegarder
          </Button>
        </Group>
      </form>
    </Container>
  );
};
