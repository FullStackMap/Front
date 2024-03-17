import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mantine/hooks';

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
import { DeleteForm } from '../../components/profile/DeleteForm/DeleteForm.tsx';

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

  const selectForm = (index: number) => {
    setActive(index);
    setActualForm(index);
  };

  const navigateToCGU = () => {
    setActualForm(3);
    navigate('/cgu');
  };

  const navigateToChangePassword = () => {
    setActualForm(1);
    navigate('/forgotPassword');
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
          navigateToChangePassword();
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
            {actualForm === 0 && <ProfileForm />}
            {actualForm === 2 && <ChangeEmailForm />}
            {actualForm === 4 && <DeleteForm />}
          </Grid.Col>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProfilePage;
