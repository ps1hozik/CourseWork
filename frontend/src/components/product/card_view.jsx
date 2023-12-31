import {
  Flex,
  Text,
  Button,
  Box,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Popover,
  PopoverTrigger,
  PopoverArrow,
  PopoverContent,
  PopoverCloseButton,
  PopoverBody,
} from "@chakra-ui/react";

import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function CardView({
  id,
  name,
  manufacturer,
  barcode,
  price,
  total_quantity,
  booked_quantity,
  description,
  remove,
}) {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const deleteProduct = () => {
    cookies.set("product_id", id);
    remove();
  };
  return (
    <Flex
      bg="white"
      flexDirection="column"
      alignItems="center"
      rounded="md"
      mr={10}
      ml={10}
      p={6}
      mt={10}
      w="100%"
      maxWidth={320}
    >
      <Card bg="gray.100" p={4} roundedTop="md" mb={4} w="100%">
        <CardHeader>
          <Heading size="lg">{name}</Heading>
        </CardHeader>
        <CardBody>
          <Text size="md">Производитель</Text>
          <Heading size="md" mb={1}>
            {manufacturer}
          </Heading>
          <Text size="md">Штрих-код</Text>
          <Heading size="md" mb={1}>
            {barcode}
          </Heading>
          <Text size="md">Цена</Text>
          <Heading size="md" mb={1}>
            {price}
          </Heading>
          <Text size="md">Количество</Text>
          <Heading size="md" mb={1}>
            {total_quantity}
          </Heading>
          <Text size="md">Забронировано</Text>
          <Heading size="md" mb={1}>
            {booked_quantity}
          </Heading>
          <Popover>
            <PopoverTrigger>
              <Button
                m={0}
                p={0}
                b={0}
                size="md"
                outline="none"
                colorScheme="teal"
                variant="link"
              >
                Описание
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody p={5}>{description}</PopoverBody>
            </PopoverContent>
          </Popover>
        </CardBody>
      </Card>

      <Flex w="100%">
        <Button
          colorScheme="teal"
          w="full"
          onClick={() => {
            cookies.set("product_id", id);
            console.log(`/product_update/${id}`);
            navigate(`/product_update/${id}`);
          }}
        >
          Изменить
        </Button>
        <Button colorScheme="teal" ml={2} onClick={deleteProduct}>
          X
        </Button>
      </Flex>
    </Flex>
  );
}
