'use client';
import { Paper, Text, TextInput, Textarea, Button, Group, SimpleGrid, Container, NativeSelect, Select, Title } from '@mantine/core';
// import bg from './bg.svg';
import classes from './addproduct.module.css';
import { DropzoneButton } from './Dropzone';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';

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

function CreateNFT() {

    const [selFile, setSelFile] = useState('');

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            image: '',
            rarity: rarities[0],
            category: categories[0],
            floorPrice: 0,
            volume: 0,
            chain: chains[0],
            currency: currencies[0],
        },
        // validationSchema: LoginSchema,
        onSubmit: async (values, { resetForm }) => {
            if (!selFile) {
                enqueueSnackbar("Please select a file", { variant: "error" })
                return;
            } else {
                values.image = selFile;
            }
            console.log(values);

            const res = await fetch(`http://localhost:5000/nft/add`, {
                method: 'POST',
                body: JSON.stringify(values),
                headers: { 'Content-Type': 'application/json' }
            });

            console.log(res.status);
            if (res.status === 200) {
                enqueueSnackbar('Succesfully Registered', { variant: 'success' })
            }
            else {
                enqueueSnackbar("Error Occured", { variant: "error" })
            }
        },
    });

    // console.log(formik.errors);

    return (
        <Container>
            <Paper shadow="md" radius="lg">
                <Title align="center" my={30}>NFT Marketplace</Title>
                <div className={classes.wrapper}>
                    <div className={classes.contacts} >
                        <Text fz="lg" fw={700} className={classes.title} c="#fff">
                            Create New NFT
                        </Text>
                        <img style={{width: 300}} src="https://cdni.iconscout.com/illustration/premium/thumb/nft-wallet-6263549-5174751.png?f=webp" alt="" />

                    </div>

                    <form className={classes.form} onSubmit={formik.handleSubmit}>
                        <Text fz="lg" fw={700} className={classes.title}>
                            Add the product
                        </Text>

                        <div className={classes.fields}>
                            <SimpleGrid cols={{ base: 1, sm: 2 }}>
                                <TextInput label="NFT Name" placeholder="NFT Name" id="name" onChange={formik.handleChange} value={formik.values.name} error={formik.touched.name && formik.errors.name} />
                                <TextInput label="NFT Description" placeholder="description" id="description" onChange={formik.handleChange} value={formik.values.description} error={formik.touched.description && formik.errors.description} />
                                <Select
                                    label="Rarety of NFT"
                                    placeholder="Select NFT Rarety"
                                    data={rarities}
                                    id="rarity"
                                    onChange={v => formik.setFieldValue('rarity', v)}
                                    value={formik.values.rarity}
                                    error={formik.touched.rarity && formik.errors.rarity}
                                />

                                <Select
                                    label="Category of NFT"
                                    placeholder="Select NFT Category"
                                    data={categories}
                                    id="category"
                                    onChange={(value) => formik.setFieldValue('category', value)}
                                    value={formik.values.category}
                                    error={formik.touched.category && formik.errors.category}
                                />
                                <TextInput label="Floor Price" placeholder="Floor Price" id="floorPrice" onChange={formik.handleChange} value={formik.values.floorPrice} error={formik.touched.floorPrice && formik.errors.floorPrice} />

                                <TextInput label="Volume" placeholder="Volume" id="volume" onChange={formik.handleChange} value={formik.values.volume} error={formik.touched.volume && formik.errors.volume} />

                                <Select
                                    label="Chain"
                                    placeholder="Select Chain"
                                    data={chains}
                                    id="chain"
                                    onChange={v => formik.setFieldValue('chain', v)}
                                    value={formik.values.chain}
                                    error={formik.touched.chain && formik.errors.chain}
                                />

                                <Select
                                    label="Currency"
                                    placeholder="Select Currency"
                                    data={currencies}
                                    id="currency"
                                    onChange={v => formik.setFieldValue('currency', v)}
                                    value={formik.values.currency}
                                    error={formik.touched.currency && formik.errors.currency}
                                />



                            </SimpleGrid>

                            <DropzoneButton setSelFilename={setSelFile} />

                            <Group justify="flex-end" mt="md">
                                <Button type="submit" disabled={formik.isSubmitting}>
                                    {formik.isSubmitting ? 'submitting...' : 'submit'}
                                </Button>
                            </Group>
                        </div>
                    </form>
                </div>
            </Paper>
        </Container>
    );
}

export default CreateNFT;