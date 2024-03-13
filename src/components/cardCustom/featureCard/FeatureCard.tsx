import React from 'react';
import { Card, Group, Text } from '@mantine/core';
import './FeatureCard.scss';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const FeatureCard = (props: FeatureCardProps)  => {  
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className="card-hover">
      <Group mb="xs">
        {props.icon}
        <Text>{props.title}</Text>
      </Group>
      <Text size="sm" color="dimmed">
        {props.description}
      </Text>
    </Card>
  );
}
