import { Button, Flex, Space, Text, Title } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons';
import { ReactNode } from 'react';

export const CarouselTitle = ({ title, children }: { title: string; children: ReactNode }) => {
  return (
    <>
      <Flex justify="space-between">
        <Title order={3}>{title}</Title>
        <Button variant="subtle" sx={{ paddingLeft: '12px', paddingRight: '4px' }}>
          <Text mr="sm">See All</Text>
          <IconChevronRight size={20} />
        </Button>
      </Flex>
      <Space h="md" />
      {children}
    </>
  );
};
