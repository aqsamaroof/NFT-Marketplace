'use client';
import {
  Paper,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
  Grid,
} from '@mantine/core';
import classes from './signup.module.css';
import { useForm } from '@mantine/form';
import { enqueueSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';

export default function Signup() {

  const router = useRouter();

  const signupForm = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
      createdAt: new Date(),
    },
    validate: {
      name: (value) => (value.length < 3 ? 'Name is too short' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 3 ? 'Password is too short' : null),
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
  });

  const handleSubmitForm = async (values) => {
    console.log(values);

    const res = await fetch(`http://localhost:5000/user/add`, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log(res.status);

    if (res.status === 200) {
      enqueueSnackbar('User added successfully', { variant: 'success' });
      router.push('/login');

    } else {
      enqueueSnackbar('Something went wrong', { variant: 'error' });
    }
  }

  return (
    <div className={classes.wrapper}>
      <Grid className={classes.grid} justify="center" align='stretch'>
        <Grid.Col p={0} span={{ base: 12, md: 6, lg: 4 }}>

          <Paper className={classes.form} radius={0} p={30}>
            <Title order={2} className={classes.title} ta="center" mt={50} mb={20}>
            Welcome to Credit Card Application System
            </Title>
            <Title order={3} className={classes.title} ta="center" mb={50}>
            Create New Account
            </Title>
            <form onSubmit={signupForm.onSubmit(handleSubmitForm)}>
              <TextInput mb="lg" withAsterisk label="Full Name" placeholder="FirstName LastName" size="md" {...signupForm.getInputProps('name')} />
              <TextInput mb="lg" withAsterisk label="Email address" placeholder="yourmail@gmail.com" size="md" {...signupForm.getInputProps('email')} />
              <PasswordInput mb="xl" withAsterisk label="Password" placeholder="Your password"  size="md" {...signupForm.getInputProps('password')} />
              <PasswordInput mb="xl" withAsterisk label="Confirm Password" placeholder="Confirm password"  size="md" {...signupForm.getInputProps('confirmPassword')} />
              {/* <Checkbox label="Keep me logged in" mt="xl" size="md" /> */}
              <Button fullWidth mt="xl" size="md" type='submit'>
                Register
              </Button>
            </form>


            <Text ta="center" mt="md">
              Don&apos;t have an account?{' '}
              {/* <Anchor<'a'> href="#" fw={700} onClick={(event) => event.preventDefault()}>
            Register
          </Anchor> */}
            </Text>
          </Paper>
        </Grid.Col>

        <Grid.Col p={0} span={8} md={6} lg={4} sm={12} className={classes.info_bg}>
          <div style={{padding: 50}}>

          </div>
        </Grid.Col>
      </Grid>
    </div>
  );
}