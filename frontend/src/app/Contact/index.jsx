import {
    Text,
    Title,
    SimpleGrid,
    TextInput,
    Textarea,
    Button,
    Group,
    ActionIcon,
    Container,
} from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons-react';
import { ContactIconsList } from './ContactIcons';
import classes from './contact.module.css';
import { useForm } from '@mantine/form';
import { enqueueSnackbar } from 'notistack';

const social = [IconBrandTwitter, IconBrandYoutube, IconBrandInstagram];

export function ContactUs() {

    const contactForm = useForm({
        initialValues: {
            email: '',
            name: '',
            message: '',
            createdAt: new Date(),
        }
        //     validate: {
        //       name: (value) => (value.length < 3 ? 'Name is too short' : null),
        //       email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        //       message: (value) => (value.length < 3 ? 'Password is too short' : null)

    }
    );

    const handleSubmitForm = async (values) => {
        console.log(values);
        // console.log(import.meta.env.VITE_API_URL);

        const res = await fetch(`${import.meta.env.VITE_API_URL}/contact/add`, {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log(res.status);

        if (res.status === 200) {
            enqueueSnackbar('Query added successfully', { variant: 'success' });
            //   navigate('/login');
            contactForm.reset();

        } else {
            enqueueSnackbar('Something went wrong', { variant: 'error' });
        }

    }

    const icons = social.map((Icon, index) => (
        <ActionIcon key={index} size={28} className={classes.social} variant="transparent">
            <Icon size="1.4rem" stroke={1.5} />
        </ActionIcon>
    ));

    return (
        <div className={classes.wrapper}>
            <Container size="lg" >
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={50}>
                    <div>
                        <Title className={classes.title}>Contact us</Title>
                        <Text className={classes.description} mt="sm" mb={30}>
                            Leave your email and we will get back to you within 24 hours
                        </Text>

                        <ContactIconsList />

                        <Group mt="xl">{icons}</Group>
                    </div>
                    <div className={classes.form}>
                        <form onSubmit={contactForm.onSubmit(handleSubmitForm)}>


                            <TextInput
                                label="Email"
                                placeholder="your@email.com"
                                required
                                {...contactForm.getInputProps('email')}
                                classNames={{ input: classes.input, label: classes.inputLabel }}
                            />
                            <TextInput
                                label="Name"
                                placeholder="John Doe"
                                mt="md"
                                {...contactForm.getInputProps('name')}
                                classNames={{ input: classes.input, label: classes.inputLabel }}
                            />
                            <Textarea
                                required
                                label="Your message"
                                placeholder="I want to order your goods"
                                minRows={4}
                                mt="md"
                                {...contactForm.getInputProps('message')}
                                classNames={{ input: classes.input, label: classes.inputLabel }}
                            />

                            <Group justify="flex-end" mt="md">
                                <Button type='submit' className={classes.control}>Send message</Button>
                            </Group>
                        </form>
                    </div>
                </SimpleGrid>
            </Container>
        </div>
    );
}