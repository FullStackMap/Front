import React from 'react';
import { Card, Group, Text } from '@mantine/core';
import './FeatureCard.scss';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className="card-hover">
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
