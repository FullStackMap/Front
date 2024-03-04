import React from 'react';
import { Card, Group, Text } from '@mantine/core';
import { useHover } from '@mantine/hooks';

interface DestinationCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function DestinationCard({
  icon,
  title,
  description,
}: DestinationCardProps) {
  const { hovered, ref } = useHover();
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      ref={ref}
      style={{ border: hovered ? '2px solid teal' : '2px solid transparent' }}>
      <Group mb="xs">
        {icon}
        <Text>{title}</Text>
      </Group>
      <Text size="sm" color="dimmed">
        {description}
      </Text>
    </Card>
  );
}
