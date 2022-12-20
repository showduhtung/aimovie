import { Fragment, ReactNode } from 'react';
import {
  IconBrandZoom,
  IconHome2,
  IconCompass,
  IconUsers,
  IconAlarm,
  IconClock,
  IconBookmark,
  IconStar,
  IconDownload,
  IconSettings,
  IconHelp,
  IconLogout,
} from '@tabler/icons';
import { Flex, Navbar, NavLink, Title, Space, Box, Divider } from '@mantine/core';

export const NavigationSidebar = () => {
  return (
    <Navbar width={{ base: 250 }} p="xs">
      <Navbar.Section>
        <NavTitle />
      </Navbar.Section>
      <Navbar.Section grow>
        <NavBody />
      </Navbar.Section>
      <Navbar.Section>
        <NavFooter />
      </Navbar.Section>
    </Navbar>
  );
};

const defaultSections = [
  {
    title: 'Menu',
    children: [
      { label: 'Home', icon: <IconHome2 /> },
      { label: 'Discovery', icon: <IconCompass /> },
      { label: 'Community', icon: <IconUsers />, disabled: true },
      { label: 'Coming Soon', icon: <IconAlarm />, disabled: true },
    ],
  },
  {
    title: 'Library',
    children: [
      { label: 'Recent', icon: <IconClock />, disabled: true },
      { label: 'Bookmarked', icon: <IconBookmark />, disabled: true },
      { label: 'Top Rated', icon: <IconStar />, disabled: true },
      { label: 'Downloaded', icon: <IconDownload />, disabled: true },
    ],
  },
  {
    title: '',
    children: [
      { label: 'Settings', icon: <IconSettings />, disabled: true },
      { label: 'Help', icon: <IconHelp />, disabled: true },
    ],
  },
];

const NavBody = () => {
  return (
    <>
      <Space h="xl" />
      <Space h="xl" />
      {defaultSections.map(({ title, children }, idx) => (
        <Fragment key={title}>
          <NavSection title={title} key={title + String(idx)}>
            {children.map(({ label, icon, disabled }, optionIdx) => (
              <NavLink
                key={label + String(optionIdx)}
                styles={(theme) => ({
                  root: {
                    '&:hover': {
                      backgroundColor:
                        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
                      color: theme.colors.blue[4],
                    },
                    paddingLeft: '0',
                  },
                  body: { marginLeft: '12px' },
                })}
                label={label}
                icon={icon}
                disabled={disabled}
              />
            ))}
          </NavSection>
          {defaultSections.length - 1 !== idx && <Divider my="sm" />}
        </Fragment>
      ))}
    </>
  );
};

const NavSection = ({ title, children }: { title: string; children: ReactNode }) => {
  return (
    <Box ml="lg">
      <Title order={3}>{title}</Title>
      <Space h="sm" />
      {children}
    </Box>
  );
};

const NavTitle = () => (
  <Title inherit variant="gradient" align="center">
    <Flex justify="center" align="center" gap="sm">
      <IconBrandZoom size={35} />
      AIMovies
    </Flex>
  </Title>
);

const NavFooter = () => (
  <Box ml="lg">
    <NavLink
      styles={(theme) => ({
        root: {
          '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
            color: theme.colors.blue[4],
          },
          paddingLeft: '0',
        },
        body: { marginLeft: '12px' },
      })}
      label="Logout"
      icon={<IconLogout />}
      disabled
    />
  </Box>
);
