import { Stack } from '@mantine/core';
import { IconSun, IconPhone, IconMapPin, IconAt } from '@tabler/icons-react';
import './ContactIcons.scss';
import { ContactIcon } from './ContactIcon';


const informationsContact = [
  { title: 'Email', description: 'contact@fromA2B.com', icon: IconAt },
  { title: 'Téléphone', description: '+33 1 23 45 67 89', icon: IconPhone },
  { title: 'Adresse', description: 'Paris, France', icon: IconMapPin },
  { title: 'Horaire', description: 'Lun - Ven: 9:00 - 18:00', icon: IconSun },
];

export const ContactIconsList = () => {  
  const items = informationsContact.map((item, index) => (
    <ContactIcon key={index} {...item} />
  ));
  return <Stack>{items}</Stack>;
}
