import React from 'react';
import { Badge, Button, Flex, Spacer, Text, useColorMode, useDisclosure, useToast } from '@chakra-ui/react';
import ChoiseMasterModal from './adminPage/ChoiseMasterModal';
import { useAppDispatch } from '../../redux/hooks';
import type { OrderAcceptData, OrderType } from '../../types/order';
import { thunkAcceptOrders } from '../../redux/order/orderThunk';

type Props = {
  order: OrderType;
};

export default function ActiveOrder({ order }: Props): JSX.Element {
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
        flexDirection='column'
        width="auto"
        borderWidth="1px"
        borderRadius='20'
        overflow="hidden"
        p={4}
        bg="gray.100"
        alignItems="center"
        justifyContent="space-between"
        boxShadow="md"
        margin={5}
      >
        <Flex width="100%" direction="row" justifyContent="space-between" alignItems="center">
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            Номер заявки: {order.id}
          </Text>
          <Badge p={2} borderRadius={10} colorScheme="blue" fontSize="sm">
            {order.status === 'active'
              ? 'Активная'
              : order.status === 'pending'
              ? 'В ожидании'
              : 'Закрыта'}
          </Badge>
        </Flex>

        <Flex width="100%" direction="row" justifyContent="space-between" alignItems="flex-start">
          <Flex direction="column">
            <Text fontSize="md">
              <strong>Создал:</strong> {order.User.name}
            </Text>
            <Text fontSize="md">
              <strong>Адрес:</strong> {order.User.address}
            </Text>
          </Flex>
          <Flex direction="column">
            <Text fontSize="md">
              <strong>Дата создания:</strong> {order.dateOpen.slice(0, 10)}
            </Text>
            {order.dateExp ? (
              <Text fontSize="md">
                <strong>Дата выполнения:</strong> {order.dateExp.slice(0, 10)}
              </Text>
            ) : null}
          </Flex>
        </Flex>

        {order.status === 'pending' && (
          <Flex direction="row" justifyContent='start'>
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
        )}
      </Flex>
      <ChoiseMasterModal order={order} isOpen={isOpen} onClose={onClose} />
    </>
  );
}
