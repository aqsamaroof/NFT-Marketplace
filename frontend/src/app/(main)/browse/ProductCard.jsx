'use client';

import { Badge, Button, Card, Container, Flex, Grid, Group, Text, useHovered } from "@mantine/core";
import classes from './browse.module.css';
import { useRouter } from "next/navigation";
import { useState } from "react";

const ProductCard = ({ productData }) => {

  const router = useRouter();

  const stringSlicer = (str, limit) => {
    if (str.length > limit) {
      return str.slice(0, limit) + '...';
    }
    return str;
  }

  const rarityBadge = (rarity) => {
    switch (rarity) {
      case 'Common':
        return 'green';
      case 'Uncommon':
        return 'blue';
      case 'Rare':
        return 'purple';
      case 'Epic':
        return 'pink';
      case 'Legendary':
        return 'red';
      default:
        return 'gray';
    }
  }

  return (

    <Card withBorder radius="md" className={classes.card}
      onClick={
        () => router.push('/nft-details/' + productData._id)
      }
    >
      <Card.Section className={classes.imageSection}>
        <div className={classes.Container - useHovered}>
          <img className={classes.prodImg} src={`http://localhost:5000/${productData.image}`} alt={productData.name} />
        </div>
      </Card.Section>

      <Group justify="space-between" mt="md">
        <div>
          <Text fw={500}>
            {stringSlicer(productData.name, 30)}
          </Text>
          <Text fz="xs" c="dimmed">
            {stringSlicer(productData.description, 40)}
          </Text>
        </div>
      </Group>

      <Card.Section className={classes.section} mt="md">
        <Flex justify="space-between">
          <Text fz="sm" c="dimmed" className={classes.label}>
            {productData.category}
          </Text>
          <Badge color={rarityBadge(productData.rarity)} variant="filled">{productData.rarity}</Badge>
        </Flex>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Group gap={30}>
          <div>
            <Text fz="xl" fw={700} m={0} style={{ lineHeight: 1 }}>
              {productData.floorPrice} {productData.currency}
            </Text>
          </div>
        </Group >
      </Card.Section>
    </Card>
  );
}

export default ProductCard;