import { useState } from 'react';
import { IconGauge, } from '@tabler/icons-react';
import { Box, NavLink } from '@mantine/core';
import ProfileForm from "../profileForm/ProfileForm.tsx";
import ChangePasswordForm from "../changePasswordForm/ChangePasswordForm.tsx";
import ChangeEmailForm from "../changeEmailForm/ChangeEmailForm.tsx";
import CGU from "../CGU/CGU.tsx";



const data = [
    { icon: IconGauge, label: 'Mon Compte' },
    {icon: IconGauge, label: 'Changer Mon Mot De Passe' },
    {icon: IconGauge, label: 'Changer Mon Email' },
    {icon: IconGauge, label: 'Condition Générale D\'utilisation' },
    {icon: IconGauge, label: 'Supprimer Mon Compte' },
];

const NavBarProfile = () => {
    const [active, setActive] = useState(0);
    const [actualForm, setActualForm] = useState(0);

    const selectForm = (index: number,) => {
    setActive(index);
    setActualForm(index);
        console.log(actualForm);
    }

    const items = data.map((item, index) => (
        <NavLink
            href="#required-for-focus"
            key={item.label}
            active={index === active}
            label={item.label}
            leftSection={<item.icon size="1rem" stroke={1.5} />}
            onClick={() => selectForm(index)}
            color="yellow"
        />
    ));

    return (
        <div>
            <Box w={220}>{items}</Box>
            {actualForm === 0 && <ProfileForm /> }
            {actualForm === 1 && <ChangePasswordForm />}
            {actualForm === 2 && <ChangeEmailForm />}
            {actualForm === 3 && <CGU />}
        </div>
)
}

export default NavBarProfile;