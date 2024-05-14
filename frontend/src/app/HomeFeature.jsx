import {
    Badge,
    Group,
    Title,
    Text,
    Card,
    SimpleGrid,
    Container,
    rem,
    useMantineTheme,
  } from '@mantine/core';
  import { IconGauge, IconUser, IconCookie, IconUserCheck, IconForms, IconCreditCard } from '@tabler/icons-react';
  import classes from './homeFeatures.module.css';
  // import { Dots } from '../Dots';
  // import dotClasses from '../Dots/dots.module.css';
  
  const mockdata = [
    {
      title: 'Create an Account',
      description:
        'Create an account with us. It is free and will always be. We will never share your information with anyone',
      icon: IconUserCheck,
    },
    {
      title: 'Fill in the Details',
      description:
        'Fill all the details required for the application. The more details you provide, the better the chances of approval',
      icon: IconForms,
    },
    {
      title: 'Apply for Credit Card',
      description:
        "Apply for the credit card you want. We'll let you know if you are eligible for the card or not",
      icon: IconCreditCard,
    },
  ];
  
  export function HomeFeatures() {
    const theme = useMantineTheme();
    const features = mockdata.map((feature) => (
      <Card key={feature.title} shadow="md" radius="md" className={classes.card} padding="xl">
        <feature.icon
          style={{ width: rem(50), height: rem(50) }}
          stroke={2}
          color={theme.colors.blue[6]}
        />
        <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
          {feature.title}
        </Text>
        <Text fz="sm" c="dimmed" mt="sm">
          {feature.description}
        </Text>
      </Card>
    ));
  
    return (
      <Container size="lg" py="xl">
  
        {/* <Group justify="center">
            <Badge variant="filled" size="lg">
              Credit
            </Badge>
          </Group> */}
  
        <Title order={2} className={classes.title} ta="center" mt="sm">
          Apply for Credit Card in 3 Easy Steps
        </Title>
  
        <Text c="dimmed" className={classes.description} ta="center" mt="md">
          Better Credit Score has better chances of Credit Card Application approfa-flip-vertical.
        </Text>
  
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
          {features}
        </SimpleGrid>
      </Container>
    );
  }