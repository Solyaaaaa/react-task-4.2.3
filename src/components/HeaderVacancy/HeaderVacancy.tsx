import {
  Anchor,
  AppShell,
  Container,
  Grid,
  Group,
  Image,
  Indicator,
  Text,
} from '@mantine/core';
import logo from '../../assets/image.svg';
import { IconUserCircle } from '@tabler/icons-react';

export const HeaderVacancy = () => {
  return (
    <AppShell.Header>
      <Container size="xl" h="100%" maw={1440}>
        <Grid align="center" h="100%" m={0} gutter={0}>
          <Grid.Col span={{ base: 6, sm: 4 }}>
            <Group gap={10} wrap="nowrap" align="center" h={60}>
              <Image src={logo} alt="logo" w={30} h={30} />
              <Text fw={700}>.FrontEnd</Text>
            </Group>
          </Grid.Col>

          <Grid.Col span={{ base: 6, sm: 4 }}>
            <Group justify="center" gap="xl" wrap="nowrap" align="center">
              <Group gap={8} wrap="nowrap" align="center">
                <Anchor c={'rgba(0, 0, 0, 1)'} underline="never">
                  Вакансии FE
                </Anchor>
                <Indicator position="middle-center" size={6} />
              </Group>
              <Group gap={4} wrap="nowrap" align="center">
                <IconUserCircle
                  size={24}
                  color="rgba(15, 15, 16, 0.5)"
                  stroke={1.2}
                />
                <Anchor c={'rgba(15, 15, 16, 0.5)'} underline="never">
                  Обо мне
                </Anchor>
              </Group>
            </Group>
          </Grid.Col>
          <Grid.Col span={{ base: 0, sm: 4 }} visibleFrom="sm"></Grid.Col>
        </Grid>
      </Container>
    </AppShell.Header>
  );
};
