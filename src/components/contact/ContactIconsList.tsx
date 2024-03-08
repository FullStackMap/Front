import { Text, Box, Stack } from '@mantine/core';
import { IconSun, IconPhone, IconMapPin, IconAt } from '@tabler/icons-react';
import './ContactIcons.scss';

interface ContactIconProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  icon: typeof IconSun;
  title: React.ReactNode;
  description: React.ReactNode;
}

function ContactIcon({
  icon: Icon,
  title,
  description,
  ...others
}: ContactIconProps) {
  return (
    <div className="wrapper" {...others}>
      <Box mr="md">
        <Icon />
      </Box>
      <div>
        <Text size="xs" className="title">
          {title}
        </Text>
        <Text className="description">{description}</Text>
      </div>
    </div>
  );
}

const data = [
  { title: 'Email', description: 'contact@fromA2B.com', icon: IconAt },
  { title: 'Téléphone', description: '+33 1 23 45 67 89', icon: IconPhone },
  { title: 'Adresse', description: 'Paris, France', icon: IconMapPin },
  { title: 'Horaire', description: 'Lun - Ven: 9:00 - 18:00', icon: IconSun },
];

export function ContactIconsList() {
  const items = data.map((item, index) => (
    <ContactIcon key={index} {...item} />
  ));
  return <Stack>{items}</Stack>;
}
