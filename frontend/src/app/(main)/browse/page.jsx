"use client";
import { ActionIcon, AppShell, Badge, Box, Burger, Button, Card, Checkbox, Container, Grid, Group, Image, RangeSlider, Select, Text, TextInput, Title, rem, useMantineTheme } from '@mantine/core';
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import { IconRefresh, IconSearch } from '@tabler/icons-react';
import { IconArrowRight } from '@tabler/icons-react';
import ProductCard from './ProductCard';
import { useDisclosure } from '@mantine/hooks';

const chains = [
    'Ethereum',
    'Arbitrum',
    'Avalanche',
    'Binance Smart Chain',
    'BNB Chain',
    'Blast',
    'Klaytn',
    'Polygon',
    'Solana',
    'Zora'
]

const currencies = [
    'ETH',
    'ARB',
    'AVAX',
    'BNB',
    'BLAST',
    'KLAY',
    'MATIC',
    'SOL',
    'ZORA'
];

const rarities = [
    'Common',
    'Uncommon',
    'Rare',
    'Epic',
    'Legendary'
]

const categories = [
    'Art',
    'Music',
    'Video',
    'Game',
    'Collectible',
    'Utility',
    'Metaverse',
    'Domain',
    'Other'
]

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

    const filterPrice = (price) => {
        return masterList.filter(product => product.price >= price[0] && product.price <= price[1]);
    }

    const applyFilter = (field, value) => {
        setProductList(masterList.filter(product => product[field] === value));
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
        setProductList(masterList.filter(product => product.name.toLowerCase().includes(e.target.value.toLowerCase())));
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

                    <Button onClick={fetchAllProducts} variant='filled' mt={10} rightSection={
                        <IconRefresh style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                    } >Reset Filter</Button>

                    <Title order={4} mt={30}>Category</Title>
                    <Select
                        placeholder="Pick value"
                        data={categories}
                        onChange={(value) => applyFilter('category', value)}
                    />

                    <Title order={4} mt={30}>Rarity</Title>
                    <Select
                        placeholder="Pick value"
                        data={rarities}
                        onChange={(value) => applyFilter('rarity', value)}
                    />

                    <Title order={4} mt={30}>Chain</Title>
                    <Select

                        placeholder="Pick value"
                        data={chains}
                        onChange={(value) => applyFilter('chain', value)}
                    />

                    <Title order={4} mt={30}>Currency</Title>
                    <Select
                        placeholder="Pick value"
                        data={currencies}
                        onChange={(value) => applyFilter('currency', value)}
                    />

                </AppShell.Navbar>
                <AppShell.Main>
                    <>
                        <Box py={30}>
                            <Container size='lg'>
                                <Title order={1} align="center" mb={30} >Browse NFTs</Title>
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