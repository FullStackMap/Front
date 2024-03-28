import { ActionIcon, Menu } from '@mantine/core';
import {
  IconArrowBarToDown,
  IconArrowBarToUp,
  IconArrowDownBar,
  IconArrowMoveUp,
  IconCopy,
  IconDotsVertical,
  IconEdit,
  IconTrash,
} from '@tabler/icons-react';

export const StepCardMenu = () => {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon>
          <IconDotsVertical />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item leftSection={<IconEdit />}>Modifier l'étape</Menu.Item>
        <Menu.Item color="red" leftSection={<IconTrash />}>
          Supprimer l'étape
        </Menu.Item>

        <Menu.Divider />
        <Menu.Label>Déplacement de l'étape</Menu.Label>
        <Menu.Item leftSection={<IconArrowMoveUp />}>Déplacer avant</Menu.Item>
        <Menu.Item leftSection={<IconArrowDownBar />}>Déplacer après</Menu.Item>

        <Menu.Divider />
        <Menu.Label>Nouvelle étape</Menu.Label>
        <Menu.Item leftSection={<IconCopy />}>Dupliquer mon étape</Menu.Item>
        <Menu.Item leftSection={<IconArrowBarToDown />}>
          Ajouter Avant
        </Menu.Item>
        <Menu.Item leftSection={<IconArrowBarToUp />}>Ajouter Après</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
