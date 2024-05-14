'use client';
import { Card, Image, Avatar, Text, Group, Loader, Box, Grid, Container, Title, Flex, Stack, Button, ActionIcon, Paper, Rating, Textarea } from '@mantine/core';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { IconArrowLeft, IconCheck, IconTrashFilled } from '@tabler/icons-react';
import { enqueueSnackbar } from 'notistack';
import ReactTimeAgo from 'react-time-ago';

const NFTDetails = () => {

  const { id } = useParams();

  const [productDetails, setProductDetails] = useState(null);
  const [reviewList, setReviewList] = useState([]);
  const [rating, setRating] = useState(3);
  const reviewRef = useRef();

  const [selSize, setSelSize] = useState(null);
  const [selColor, setSelColor] = useState(null);

  const router = useRouter();

  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')));

  const fetchReviews = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/review/getbyproduct/${id}`);
    // console.log(response.status);
    const data = await response.json();
    console.log(data);
    setReviewList(data);
  }

  const calculateAverageRating = () => {
    let total = 0;
    reviewList.forEach(review => {
      total += review.rating;
    });
    return total / reviewList.length;
  }

  const getProductDetails = () => {
    fetch(`http://localhost:5000/nft/getbyid/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProductDetails(data);
      });
  }

  useEffect(() => {
    getProductDetails();
  }, []);

  const displayStock = (stockNum) => {
    if (stockNum > 0) {
      return <Text ml="auto" mt="auto" fw={700} c='green'>In Stock</Text>
    } else {
      return <Text ml="auto" mt="auto" fw={700} c='red'>Out of Stock</Text>
    }
  }

  const displayProductDetails = () => {
    if (productDetails !== null) {
      return (
        <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}>
          <Grid.Col span={{ md: 6, sm: 12 }}>
            <img
              src={`http://localhost:5000/${productDetails.image}`}
              width={'100%'}
            />
          </Grid.Col>
          <Grid.Col span={{ md: 6, sm: 12 }}>
            <ActionIcon mb={'xl'} size={'lg'} onClick={
              () => {
                router.back();
              }
            } variant="filled" aria-label="Previous Page">
              <IconArrowLeft style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
            <Title order={2}>
              {productDetails.name}
            </Title>
            <Rating value={calculateAverageRating()} color='blue' size="md" readOnly />
            <Text mt="xs" mb="md">
              {productDetails.description}
            </Text>
            <Flex>
              <Title order={1} mb="md">
                {productDetails.floorPrice} {productDetails.currency}
              </Title>
            </Flex>

            <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }} >
              <Grid.Col span={3}>
                <Text c='dimmed' fw={700}>Chain : </Text>
              </Grid.Col>
              <Grid.Col span={9} tt={'capitalize'}>
                <Text fw={700}>{productDetails.chain}</Text>
              </Grid.Col>
            </Grid>
            <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }} >
              <Grid.Col span={3}>
                <Text c='dimmed' fw={700}>Category : </Text>
              </Grid.Col>
              <Grid.Col span={9} tt={'capitalize'}>
                <Text fw={700}>{productDetails.category}</Text>
              </Grid.Col>
            </Grid>

            <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }} >
              <Grid.Col span={3}>
                <Text c='dimmed' fw={700}>Rarity : </Text>
              </Grid.Col>
              <Grid.Col span={9} tt={'capitalize'}>
                <Text fw={700}>{productDetails.rarity}</Text>
              </Grid.Col>
            </Grid>
            <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }} >
              <Grid.Col span={3}>
                <Text c='dimmed' fw={700}>Volume : </Text>
              </Grid.Col>
              <Grid.Col span={9} tt={'capitalize'}>
                <Text fw={700}>{productDetails.volume} ETH</Text>
              </Grid.Col>
            </Grid>


            <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }} align='center' >
              <Grid.Col span={3}>
                <Text c='dimmed' fw={700}>Published : </Text>
              </Grid.Col>
              <Grid.Col span={9} >
                <Text fw={700}>{new Date(productDetails.createdAt).toDateString()}</Text>
              </Grid.Col>
            </Grid>
            <Stack direction="horizontal" spacing="md" mt="lg">
              <Button
                onClick={() => {
                  if (!selColor || !selSize) {
                    enqueueSnackbar('Please select size and color', { variant: 'warning' });
                    return;
                  }
                  addItem(productDetails);
                }}
                radius="xl"
                size="lg"
                variant="outline"
                color="blue"
              >
                Buy NFT
              </Button>
            </Stack>

          </Grid.Col>
        </Grid>
      )
    } else {
      return <Loader />
    }
  }

  const displayReviews = () => {
    return reviewList.map((review) => (
      <Paper key={review._id} withBorder p={20} radius="md" mt={20}>
        <Flex justify="space-between" align={'start'}>

          <Group>
            <Avatar
              src={`${process.env.NEXT_PUBLIC_API_URL}/${review.user.avatar}`}
              alt={review.user.name}
              radius="xl"
            />
            <div>
              <Text fz="sm">{review.user.name}</Text>
              <Text fz="xs" c="dimmed">
                <ReactTimeAgo date={new Date()} locale="en-US" />
              </Text>
            </div>
          </Group>
          <Stack direction="horizontal" justify='flex-end'>
            <Rating value={review.rating} color='blue' size="sm" readOnly />
            {/* {
              currentUser && currentUser._id === review.user._id && (
                <ActionIcon color="red" title={'delete'} size={'sm'} variant="filled" onClick={
                  () => deleteReview(review._id)
                }>
                  <IconTrashFilled size={'xs'} />
                </ActionIcon>
              )
            } */}
          </Stack>
        </Flex>
        <Text mt={10}>{review.review}</Text>
      </Paper>
    ))
  }

  const submitReview = async () => {
    if (!currentUser) {
      enqueueSnackbar('Please login to leave a review', { variant: 'error' });
      return;
    }
    const review = reviewRef.current.value;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/review/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': currentUser.token
      },
      body: JSON.stringify({
        product: id,
        review,
        rating
      })
    });
    if (response.status === 200) {
      fetchReviews();
      enqueueSnackbar('Review submitted successfully', { variant: 'success' });
    }
  }

  const ratingForm = () => {
    if (currentUser) {
      return (
        <Paper withBorder radius="md" p={20}>

          <Rating size="lg" value={rating} onChange={v => setRating(v)} />
          <Textarea
            ref={reviewRef}
            mt={10}
            placeholder="Write your review here"
            radius="md"
            w={'100%'}
          />
          <Button variant="outline" color="blue" radius="md" mt={20} onClick={submitReview}>
            Submit
          </Button>
        </Paper>
      )
    } else {
      return <Text>Please login to leave a review</Text>
    }
  }

  const deleteReview = async (reviewId) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/review/delete/${reviewId}`, {
      method: 'DELETE'
    });
    if (response.status === 200) {
      fetchReviews();
      enqueueSnackbar('Review deleted successfully', { variant: 'success' });
    }
  }

  return (
    <Box>
      <Container py={50} size={'xl'}>
        {displayProductDetails()}
      </Container>
      {/* <Container mt={'lg'}>
        <Title order={2}>Reviews</Title>
        {ratingForm()}
        {displayReviews()}
      </Container> */}
    </Box>
  );
}

export default NFTDetails;