"use client";
import { ActionIcon, AppShell, Badge, Box, Burger, Button, Card, Checkbox, Container, Grid, Group, Image, RangeSlider, Text, TextInput, Title, rem, useMantineTheme } from '@mantine/core';
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import { IconSearch } from '@tabler/icons-react';
import { IconArrowRight } from '@tabler/icons-react';
import ProductCard from './ProductCard';
import { useDisclosure } from '@mantine/hooks';

const Browse = () => {

    const [loading, setLoading] = useState(false);
    const [masterList, setMasterList] = useState([]);
    const [productList, setProductList] = useState([]);
    const [selPriceRange, setSelPriceRange] = useState([100, 10000]);

    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

    const [selColor, setSelColor] = useState(null);
    const [selSizes, setSelSizes] = useState([]);

    const theme = useMantineTheme();

    const filterByPrice = (priceRange) => {
        return masterList.filter(product => product.price >= priceRange[0] && product.price <= priceRange[1]);
    }

    const filterByColor = (color) => {
        return masterList.filter(product => product.color.toLowerCase() === color.toLowerCase());
    }

    const filterBySize = (selSizes) => {
        return masterList.filter(product => product.size.some(size => selSizes.includes(size)));
    }

    const fetchAllProducts = () => {
        if (window !== undefined) {
            fetch(`http://localhost:5000/nft/getall`)
                .then((result) => result.json())
                .then(data => {
                    console.log(data);
                    setProductList(data);
                    setMasterList(data);
                })
                .catch((err) => {
                    console.log(err);
                });

        }
    }

    useEffect(() => {
        fetchAllProducts();
    }, []);


    const showDetails = () => {
        if (!loading) {
            return (
                productList.map(product => (
                    <Grid.Col span={{ xs: 12, sm: 6, lg: 4, xl: 3 }} key={product._id}>
                        <ProductCard productData={product} key={product._id} />
                    </Grid.Col>
                ))
            )
        } else {
            return (
                <Text>Loading</Text>
            )
        }
    }

    const searchProduct = (e) => {
        setProductList(masterList.filter(product => product.title.toLowerCase().includes(e.target.value.toLowerCase())));
    }

    return (
        <div>
            <AppShell
                header={{ height: 60 }}
                navbar={{
                    width: 300,
                    breakpoint: 'sm',
                    collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
                }}
                padding="md"
            >
                <AppShell.Header>
                    <Group h="100%" px="md">
                        <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
                        <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
                        {/* <MantineLogo size={30} /> */}
                    </Group>
                </AppShell.Header>
                <AppShell.Navbar p='md'>
                    <Title order={1}>Filter Options</Title>

                    <Title order={4}>Price</Title>
                    <RangeSlider
                        min={100}
                        max={10000}
                        // marks={priceMarks}
                        defaultValue={[100, 1000]}
                        onChangeEnd={v => setSelPriceRange([...v])}

                    />

                    <Title order={4} mt={30}>Category</Title>
                    <Checkbox.Group
                        defaultValue={['react']}
                        // label="Select your favorite frameworks/libraries"
                        // description="This is anonymous"
                        withAsterisk
                    >
                        <Group mt="xs">
                            <Checkbox value="react" label="Khadi Cotton" />
                            <Checkbox value="svelte" label="Shiffon" />
                            <Checkbox value="ng" label="Cotton" />
                            <Checkbox value="vue" label="Vescose" />
                            <Checkbox value="vue" label="Premium" />
                        </Group>
                    </Checkbox.Group>
                    <Title order={4} mt={30}>Size</Title>
                    <Checkbox.Group
                        defaultValue={['react']}
                        // label="Select your favorite frameworks/libraries"
                        // description="This is anonymous"
                        withAsterisk
                    >
                        <Group mt="xs">
                            {/* {
                                sizeOptions.map((size, index) => (
                                    <Checkbox key={index} value={size} label={size} checked={selSizes.includes(size)} onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelSizes([...selSizes, size]);
                                        } else {
                                            setSelSizes(selSizes.filter(s => s !== size));
                                        }

                                    }} />
                                ))
                            } */}
                        </Group>
                    </Checkbox.Group>
                </AppShell.Navbar>
                <AppShell.Main>
                    <>
                        <Box py={30}>
                            <Container size='lg'>
                                <TextInput
                                    onChange={searchProduct}
                                    radius="xl"
                                    size="md"
                                    placeholder="Search questions"
                                    rightSectionWidth={42}
                                    leftSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
                                    rightSection={
                                        <ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled">
                                            <IconArrowRight style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                                        </ActionIcon>
                                    }
                                />
                            </Container>
                        </Box>
                        <Grid>
                            <Grid.Col span={{ md: 12 }}>
                                <Grid>
                                    {showDetails()}
                                </Grid>
                            </Grid.Col>
                        </Grid>
                    </>
                </AppShell.Main>
            </AppShell>



        </div>
    )
}

export default Browse;