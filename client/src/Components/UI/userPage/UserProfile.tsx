import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Icon,
  Input,
  Stack,
  Text,
  Toast,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { IoCheckmarkOutline, IoPersonAdd } from 'react-icons/io5';
import { motion } from 'framer-motion';
import UserEditModal from './UserEditModal';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import OrderModalWindow from './UserOrderModal';
import { editImgThunk } from '../../../redux/auth/authThanck';
import PayForm from '../PayForm';

export default function UserProfile(): JSX.Element {
  const user = useAppSelector((store) => store.auth.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();
  const toast = useToast();

  const date1 = new Date();
  const date2 = new Date(user.endSubscibe);
  const differenceInMs = Math.abs(date2 - date1);
  const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));

  const [imageUser, setImageUser] = useState('');

  const buttonVariants = {
    hidden: { opacity: 0, x: '-100vw' },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', delay: 1 } },
  };

  const clickHandler = () => {
    if (user.subscribeLevl === '1') {
      setIsModalOpen(true);
    } else {
      toast({
        title: 'Ошибка',
        description: 'Для создания заказа необходимо оформить подписку',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Center
      ml={5}
      // mt="5px"
      py={6}
      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start' }}
      bg="gray.300"
      minH="100vh"
    >
      <Box
        flex={1}
        flexGrow={0}
        maxW="320px"
        w="full"
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow="2xl"
        rounded="lg"
        p={6}
        textAlign="center"
        position="relative"
        mr={4}
        borderRadius="30px"
        backgroundColor="#E2E8F0"
      >
        <Flex justify="center">
          <Avatar
            size="xl"
            src={`http://localhost:3001/${user.img}`}
            mb={4}
            pos="relative"
            _after={{
              content: '""',
              w: 4,
              h: 4,
              bg: 'green.300',
              border: '2px solid white',
              rounded: 'full',
              pos: 'absolute',
              bottom: 0,
              right: 3,
            }}
          />

          <label htmlFor="image-upload" style={{ cursor: 'pointer' }}>
            <Icon as={IoPersonAdd} boxSize={4} color="blue.500" _hover={{ color: 'blue.600' }} />
            <Input
              id="image-upload"
              type="file"
              onChange={(e) => setImageUser(e.target.files[0])}
              accept="image/*"
              display="none"
            />
          </label>

          <Button
            onClick={async (): Promise<void> => {
              const data = new FormData();
              data.append('avatar', imageUser);
              const res = await axios.post('http://localhost:3001/api/upload', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
              });
              const formData = {
                id: user.id,
                img: res.data.path,
              };
              void dispatch(editImgThunk(formData));
            }}
            backgroundColor='gray.200'
          >
            <Icon as={IoCheckmarkOutline} boxSize={4} color="green.500" mb='5'/>
          </Button>
        </Flex>

        <Box p={6}>
          <Stack spacing={0}>
            <Text color="gray.500">Данные пользователя</Text>
            <Text color="gray.500">
              <strong>Имя:</strong>
              {user.name}
            </Text>
            <Text color="gray.500">
              <strong>Email:</strong> {user.email}
            </Text>
            <Text color="gray.500">
              <strong>Телефон:</strong>
              {user.telephone}
            </Text>
            <Text color="gray.500">
              <strong>Адрес:</strong>
              {user.address}
            </Text>
          </Stack>

          <Stack mt={8} direction="row" spacing={4}>
            <Button
              onClick={() => setIsWindowOpen(true)}
              flex={1}
              fontSize="sm"
              rounded="full"
              _focus={{
                bg: 'gray.200',
              }}
            >
              Изменить
            </Button>
            <UserEditModal isWindowOpen={isWindowOpen} closeWindow={() => setIsWindowOpen(false)} />

            <Button
              onClick={() => clickHandler()}
              flex={1}
              fontSize="sm"
              rounded="full"
              bg="blue.400"
              color="white"
              boxShadow="0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
              _hover={{
                bg: 'blue.500',
              }}
              _focus={{
                bg: 'blue.500',
              }}
            >
              Создать заказ
            </Button>

            <OrderModalWindow show={isModalOpen} handlerClose={() => setIsModalOpen(false)} />
          </Stack>
        </Box>
      </Box>

      {user.subscribeLevl === '1' ? (
        <Box
          bg="gray.100"
          p={4}
          width="320px"
          rounded="lg"
          mt={6}
          boxShadow="base"
          fontWeight="bold"
          color="gray.600"
          style={{ display: 'Flex', flexDirection: 'column' }}
          borderRadius="30px"
        >
          <Text textAlign="center">
            До конца подписки осталось <br />
            <strong style={{ color: 'violet' }}>{differenceInDays} </strong>дней
          </Text>
          <Button
            onClick={() => setShow(true)}
            colorScheme="green"
            bg="green.400"
            rounded="full"
            px={6}
            _hover={{
              bg: 'green.500',
            }}
            my={4}
          >
            Продлить подписку
          </Button>
          <PayForm show={show} handlerClose={() => setShow(false)} />
        </Box>
      ) : (
        <Box
          bg="gray.100"
          p={4}
          rounded="lg"
          mt={6}
          boxShadow="base"
          fontWeight="bold"
          color="gray.600"
        >
          <Text>Для оплаты подиски нажмите</Text>
          <motion.div
            variants={buttonVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              onClick={() => setShow(true)}
              colorScheme="green"
              bg="green.400"
              rounded="full"
              px={6}
              _hover={{
                bg: 'green.500',
              }}
              my={4}
            >
              Оформить подписку
            </Button>
          </motion.div>
          <PayForm show={show} handlerClose={() => setShow(false)} />
        </Box>
      )}
    </Center>
  );
}
