import { Badge, Flex, Text, useColorMode, Button, useDisclosure, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import type { OrderAcceptData, OrderSliceType, OrderType } from '../../types/order';
import ChoiseMasterModal from './adminPage/ChoiseMasterModal';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { thunkAcceptOrders } from '../../redux/order/orderThunk';

type AdminOrderCardType = {
  order: OrderType;
};

export default function AdminOrderCard({ order }: AdminOrderCardType): JSX.Element {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const choiseMasterHandler = (): void => {
    try {
      const data: OrderAcceptData = {
        masterName: order.Master.name,
        orderId: order.id,
        masterId: order.masterId,
        dateExp: order.dateExp,
      };
      void dispatch(thunkAcceptOrders(data));
      
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Выбирите мастера и дату выполнения',
        status: 'error',
        duration: 1000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <Flex
        
        width="auto"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={4}
        bg={colorMode === 'light' ? 'gray.100' : 'blue.800'}
        alignItems="center"
        justifyContent="space-between"
        boxShadow="md"
        margin={5}
      >
        <Flex width="100%" direction="column" alignItems="flex-start">
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            Номер заявки: {order.id}
          </Text>
          <Text fontSize="md">
            <strong>Создал:</strong> {order.User.name}
          </Text>
          <Text fontSize="md">
            <strong>Услуга:</strong> {order.Problem.name}
          </Text>
          <Text fontSize="md">
            <strong>Адрес:</strong> {order.User.address}
          </Text>
          <Text fontSize="md">
            <strong>Дата создания:</strong> {order.dateOpen.slice(0, 10)}
          </Text>
          {order.dateExp ? (
            <Text fontSize="md">
              <strong>Дата выполнения:</strong> {order.dateExp.slice(0, 10)}
            </Text>
          ) : (
            ''
          )}
          {order.Master ? (
            <Text fontSize="md">
              <strong>Master:</strong> {order.Master.name}
            </Text>
          ) : (
            ''
          )}
        </Flex>
        {order.status === 'active' ? (
          <Badge p={2} borderRadius={10} colorScheme="blue" fontSize="sm">
            Активная
          </Badge>
        ) : order.status === 'pending' ? (
          <Flex justifyContent="space-between" flexDirection="column">
            <Badge p={2} margin={2} borderRadius={10} colorScheme="blue" fontSize="sm">
              В ожидании
            </Badge>
            <Button
              as="a"
              fontSize="sm"
              fontWeight={600}
              color="black"
              bg={colorMode === 'light' ? 'red.300' : 'red.800'}
              _hover={{
                bg: colorMode === 'light' ? 'red.200' : 'red.700',
              }}
              onClick={onOpen}
              p={1}
              margin={2}
              borderRadius={10}
            >
              Выбрать мастера
            </Button>
            <Button
              as="a"
              fontSize="sm"
              fontWeight={600}
              color="black"
              bg={colorMode === 'light' ? 'green.300' : 'green.800'}
              _hover={{
                bg: colorMode === 'light' ? 'green.200' : 'green.700',
              }}
              onClick={choiseMasterHandler}
              p={1}
              margin={2}
              borderRadius={10}
            >
              Подтвердить
            </Button>
          </Flex>
        ) : (
          <Badge p={2} borderRadius={10} colorScheme="blue" fontSize="sm">
            Закрыта
          </Badge>
        )}
      </Flex>
      <ChoiseMasterModal order={order} isOpen={isOpen} onClose={onClose} />
    </>
  );
}
