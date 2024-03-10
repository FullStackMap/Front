import React from 'react'
import { Card, Group, Text } from '@mantine/core'
import './DestinationCard.scss'

interface DestinationCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

export function DestinationCard({
  icon,
  title,
  description,
}: DestinationCardProps) {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className="card-hover"
    >
      <Group mb="xs">
        {icon}
        <Text>{title}</Text>
      </Group>
      <Text size="sm" color="dimmed">
        {description}
      </Text>
    </Card>
  )
}
