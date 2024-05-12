'use client';
import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
    TextInput,
    PasswordInput,
    Text,
    Group,
    Button,
    Divider,
    Checkbox,
    Anchor,
    Stack,
    Container,
    rem,
    Paper,
    useMantineTheme,
    useComputedColorScheme,
    Title,
} from '@mantine/core';
import { IconAt, IconKey, IconUser } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import classes from './login.module.css';
import { GoogleButton } from '../GoogleButton';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import UseAppContext from '../../AppContext';

export function Login() {
    const [type, toggle] = useToggle(['login', 'register']);


    const [gradient, setGradient] = useState('linear-gradient(0deg, #242424f0, #000000e0)');

    const theme = useMantineTheme();

    const navigate = useNavigate();

    const { setCurrentUser, setLoggedIn } = UseAppContext();
    const computedColorScheme = useComputedColorScheme('auto', { getInitialValueInEffect: true });
    // console.log(computedColorScheme);

    useEffect(() => {
        // console.log(theme.colorScheme);
        if (computedColorScheme === 'dark') {
            setGradient('linear-gradient(0deg, #000000f7, #000000f7)');
        } else {
            setGradient('linear-gradient(0deg, #ff0000f7, #000000f7)');
        }
    }, [])

    const loginForm = useForm({
        initialValues: {
            email: '',
            password: ''
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (value.length < 3 ? 'Password is too short' : null)
        },
    });

    const handleLoginSubmit = async (values) => {
        console.log(values);
        // console.log(import.meta.env.VITE_API_URL);

        const res = await fetch(`${import.meta.env.VITE_API_URL}/user/auth`, {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log(res.status);

        if (res.status === 200) {
            enqueueSnackbar('Logged in successfully', { variant: 'success' });

            const data = await res.json();

            if (data.role === 'admin') {

                sessionStorage.setItem('admin', JSON.stringify(data));
                navigate('/admin/manageuser');
            } else if (data.role === 'user') {

                sessionStorage.setItem('user', JSON.stringify(data));
                navigate('/applicationform');
            }
            setLoggedIn(true);
            setCurrentUser(data);

        } else if (res.status === 401) {
            enqueueSnackbar('Invalid credentials', { variant: 'error' });

        } else {
            enqueueSnackbar('Something went wrong', { variant: 'error' });
        }
    }

    return (
        <Paper className={classes.bg} style={{
            backgroundImage: `linear-gradient(0deg, ${computedColorScheme === 'dark' ? '#000000e0, #000000e0' : '#ffffff8c, #ffffff8c'}), url("https://daylight.io/hubfs/AdobeStock_295001063-blog-image-Jul12-V2.jpg")`
        }}>
            <Container w={'100%'} size={460}>
                <Title order={1} style={{ textAlign: 'center' }}>
                    Welcome Back User!
                </Title>
                <Title order={3} style={{ textAlign: 'center' }}>
                    Login with
                </Title>


                {/* <Group grow mb="md" mt="md">
                    <GoogleButton radius="xl">Google</GoogleButton>
                    <TwitterButton radius="xl">Twitter</TwitterButton>
                </Group> */}

                {/* <Divider label="Or continue with email" labelPosition="center" my="lg" /> */}

                <form onSubmit={loginForm.onSubmit(handleLoginSubmit)}>
                    <Stack>
                        {type === 'register' && (
                            <TextInput
                                label="Name"
                                placeholder="Your name"
                                leftSection={<IconUser style={{ width: rem(16), height: rem(16) }} />}
                                radius="md"
                            />
                        )}

                        <TextInput
                            required
                            label="Email"
                            placeholder="hello@mantine.dev"
                            leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
                            {...loginForm.getInputProps('email')}
                            radius="md"
                        />

                        <PasswordInput
                            required
                            label="Password"
                            placeholder="Your password"
                            leftSection={<IconKey style={{ width: rem(16), height: rem(16) }} />}
                            {...loginForm.getInputProps('password')}
                            radius="md"
                        />

                        {type === 'register' && (
                            <Checkbox
                                label="I accept terms and conditions"
                                checked={form.values.terms}
                                onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
                            />
                        )}
                    </Stack>

                    <Group justify="space-between" mt="xl">
                        <Anchor component={Link} to="/signup" c="dimmed" size="xs">
                            Don't have an account? Register
                        </Anchor>
                        <Button type="submit" radius="xl">
                            Login
                        </Button>
                    </Group>
                    <Anchor style={{ textAlign: 'center', display: 'block' }} mt={30} component={Link} to="/resetpassword" c="dimmed" size="xs">
                        Having Trouble Signing in?
                    </Anchor>
                </form>
            </Container>
        </Paper>
    );
}