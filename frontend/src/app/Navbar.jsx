import { useState } from 'react';
import { Container, Group, Burger, ActionIcon, useMantineColorScheme, useComputedColorScheme, Title, Avatar, Menu, rem, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './navbar.module.css';
import { IconLogout, IconMessageCircle, IconMoon, IconPhoto, IconSettings, IconSun, IconUser } from '@tabler/icons-react';
import cx from 'clsx';
import app_config from '../appConfig';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import UseAppContext from '@/context/AppContext';

const links = [
  { link: '/', label: 'Home' },
  { link: '/applicationform', label: 'Application Form' }
];

export function Navbar() {
  const [opened, { toggle }] = useDisclosure(false);
  const router = useRouter();

  const { logout, loggedIn, currentUser } = UseAppContext();

  const pathname = usePathname();
  // console.log(pathname);

  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('auto', { getInitialValueInEffect: true });

  // const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')));

  const items = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={pathname === link.link || undefined}
    >
      {link.label}
    </Link>
  ));

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Flex justify={'center'} align={'center'} gap={10}>
          <img src={'/logo.png'} alt="logo" style={{ width: rem(40), height: rem(40) }} />
          <Title order={3}>{app_config.title}</Title>
        </Flex>
        <Group gap={5} visibleFrom="xs">
          {items}
          {
            !loggedIn && (
              <>
                <Link
                  href={"/login"}
                  className={classes.link}
                  data-active={pathname === "/login" || undefined}
                >
                  Login
                </Link>
                <Link
                  href={"/signup"}
                  className={classes.link}
                  data-active={pathname === "/signup" || undefined}
                >
                  Signup
                </Link>
                <Link
                  href={"/banklogin"}
                  className={classes.link}
                  data-active={pathname === "/banklogin" || undefined}
                >
                  Bank Login
                </Link>
                <Link
                  href={"/admin"}
                  className={classes.link}
                  data-active={pathname === "/admin" || undefined}
                >
                  Admin
                </Link>
              </>
            )
          }
          <>

          </>
        </Group>
        <ActionIcon
          onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
          variant="default"
          size="xl"
          aria-label="Toggle color scheme"
        >
          <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
          <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
        </ActionIcon>
        {
          (loggedIn && currentUser !== null) && (

            <Menu shadow="md" width={200}>
              <Menu.Target>

                <Avatar radius="xl" src={`https://api.dicebear.com/7.x/initials/svg?seed=${currentUser.name}&scale=75`} />
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item onClick={e => router.push('/user/profile')} color='cyan' leftSection={<IconUser style={{ width: rem(14), height: rem(14) }} />}>
                  Profile
                </Menu.Item>
                <Menu.Item onClick={e => router.push('/user/applicationstatus')} color='green' leftSection={<IconMessageCircle style={{ width: rem(14), height: rem(14) }} />}>
                  Application Status
                </Menu.Item>
                <Menu.Item onClick={logout} color='red' leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}>
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )
        }

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}