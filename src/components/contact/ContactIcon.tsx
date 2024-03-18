import { Text, Box } from '@mantine/core';
import { IconSun} from '@tabler/icons-react';
import './ContactIcons.scss';

interface ContactIconProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  icon: typeof IconSun;
  title: React.ReactNode;
  description: React.ReactNode;
}

export const ContactIcon = (props : ContactIconProps) => {
  return (
    <div className="wrapper">
      <Box mr="md">
        <props.icon size={24} />
      </Box>
      <div>
        <Text size="xs" className="title">
          {props.title}
        </Text>
        <Text className="description">{props.description}</Text>
      </div>
    </div>
  );
}
