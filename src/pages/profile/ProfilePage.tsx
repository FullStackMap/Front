import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';

import {
  IconUser,
  IconLock,
  IconMail,
  IconFileText,
  IconTrash,
  IconChevronRight,
} from '@tabler/icons-react';
import { NavLink, Container, Grid, Paper } from '@mantine/core';
import { ProfileForm } from '../../components/profile/profileForm/ProfileForm.tsx';
import { ChangeEmailForm } from '../../components/profile/changeEmailForm/ChangeEmailForm.tsx';
import { DeleteFormModal } from '../../components/profile/DeleteForm/DeleteFormModal.tsx';
import { RequestResetPasswordModal } from '../../components/passwordReset/RequestResetPasswordModal';
import { AuthStore, useAuthStore } from '../../store/useAuthStore.ts';

const data = [
  { icon: IconUser, label: 'Mon Compte' },
  { icon: IconLock, label: 'Changer Mon Mot De Passe' },
  { icon: IconMail, label: 'Changer Mon Email' },
  { icon: IconFileText, label: "Condition Générale D'utilisation" },
  { icon: IconTrash, label: 'Supprimer Mon Compte' },
];

const ProfilePage = () => {
  const [active, setActive] = useState(0);
  const [actualForm, setActualForm] = useState(0);
  const navigate = useNavigate();

  const isLogged = useAuthStore((state: AuthStore) => state.isLogged);
  useEffect(() => {
    if (!isLogged) navigate('/login');
  }, [isLogged, navigate]);

  const user = useAuthStore((state: AuthStore) => state.user);

  const selectForm = (index: number) => {
    setActive(index);
    setActualForm(index);
  };

  const navigateToCGU = () => {
    setActualForm(3);
    navigate('/cgu');
  };

  const [
    resetPasswordRequestModalIsOpen,
    { toggle: toggleResetPasswordRequestModalIsOpen },
  ] = useDisclosure(false);

  const handleCloseResetPasswordModal = () => {
    toggleResetPasswordRequestModalIsOpen();
    selectForm(0);
  };

  const [deleteFormModalIsOpen, { toggle: toggledeleteFormModalIsOpen }] =
    useDisclosure(false);

  const handleCloseDeleteModal = () => {
    toggledeleteFormModalIsOpen();
    selectForm(0);
  };

  const items = data.map((item, index) => (
    <NavLink
      key={item.label}
      active={index === active}
      label={item.label}
      leftSection={<item.icon size={18} />}
      rightSection={<IconChevronRight size={18} />}
      onClick={() => {
        if (index === 3) {
          navigateToCGU();
        } else if (index === 1) {
          toggleResetPasswordRequestModalIsOpen();
          selectForm(1);
        } else if (index === 4) {
          toggledeleteFormModalIsOpen();
          selectForm(4);
        } else {
          selectForm(index);
        }
      }}
      autoContrast
    />
  ));

  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Container size="xl">
      <Paper shadow="md" radius="lg" mt="xl" p="xl">
        <Grid grow justify="center" align="center">
          <Grid.Col
            span={3}
            h={isMobile ? 'auto' : '500'}
            style={{
              borderRight: isMobile ? 'none' : '2px solid #eaeaea',
              borderBottom: isMobile ? '2px solid #eaeaea' : 'none',
            }}>
            <Container>{items}</Container>
          </Grid.Col>
          <Grid.Col span={9}>
            {actualForm === 0 && <ProfileForm user={user} />}
            {actualForm === 1 && (
              <RequestResetPasswordModal
                isOpen={resetPasswordRequestModalIsOpen}
                close={handleCloseResetPasswordModal}
              />
            )}
            {actualForm === 2 && <ChangeEmailForm userId={user?.Id} />}
            {actualForm === 4 && (
              <DeleteFormModal
                userId={user?.Id}
                isOpen={deleteFormModalIsOpen}
                close={handleCloseDeleteModal}
              />
            )}
          </Grid.Col>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProfilePage;
