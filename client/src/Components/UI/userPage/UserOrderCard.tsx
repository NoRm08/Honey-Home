import { Badge, Button, Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import type { OrderType } from '../../../types/order';
import CommentEditModal from './CommentEditModal';
import {
  thunkDeleteOrder,
} from '../../../redux/order/orderThunk';
import { useAppDispatch } from '../../../redux/hooks';

type UserOrderCardType = {
  order: OrderType;
};

export default function UserOrderCard({ order }: UserOrderCardType): JSX.Element {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useAppDispatch();

  const closeModal = (): void => {
    setOpenModal(false);
  };

  return (
    <Flex
      width="auto"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      bg="gray.100"
      alignItems="center"
      justifyContent="space-between"
      boxShadow="md"
      margin={5}
    >
      <Flex width="100%" direction="column" alignItems='flex-start' >
        <Text fontSize="md" lineHeight="taller">
          <strong>Номер заявки:</strong> {order.id}
        </Text>
        <Text fontSize="md" lineHeight="taller"><strong>Услуга:</strong> {order.Problem.name}</Text>
        <Text fontSize="md" lineHeight="taller">
          <strong>Дата создания:</strong> {order.dateOpen.slice(0, 10)}
        </Text>
        <Text fontSize="md" lineHeight="taller">
          <strong>Комментарий:</strong> {order.comment}
        </Text>
        {order.dateExp ? (
          <Text fontSize="md" lineHeight="taller">
            <strong>Дата выполнения:</strong> {order.dateExp.slice(0, 10)}
          </Text>
        ) : (
          ''
        )}
        {order.Master ? (
          <Text fontSize="md" lineHeight="taller">
            <strong>Master:</strong> {order.Master.name}
          </Text>
        ) : (
          ''
        )}
      </Flex>
      {order.status === 'active' ? (
        <>
          <Badge p={2} margin={2} borderRadius={10} colorScheme="blue" fontSize="sm" mr='100px' mt='10px'>
            Активная
          </Badge>
          <Button
            onClick={() => setOpenModal(true)}
            p={2}
            margin={2}
            borderRadius={10}
            colorScheme="green"
            fontSize="sm"
            minW="100px"
          >
            Подтвердить
          </Button>
        </>
      ) : order.status === 'pending' ? (
        <Flex justifyContent="space-between" flexDirection="row">
          <div>
          <Badge p={2} margin={2} borderRadius={10} colorScheme="blue" fontSize="sm" mr='100px' mt='35px'>
            На рассмотрении
          </Badge>
          </div>
          <div>
          <Button
            onClick={() => setOpenModal(true)}
            p={2}
            margin={2}
            borderRadius={10}
            colorScheme="blue"
            fontSize="sm"
            minW="100px"
          >
            Изменить
          </Button>
          <Button
            onClick={() => void dispatch(thunkDeleteOrder(order.id))}
            p={2}
            margin={2}
            borderRadius={10}
            colorScheme="red"
            fontSize="sm"
            minW="100px"
          >
            Удалить
          </Button>
          </div>

          <CommentEditModal openModal={openModal} order={order} closeModal={closeModal} />
        </Flex>
        
      ) : (
        <Badge p={2} borderRadius={10} colorScheme="blue" fontSize="sm">
          Закрыта
        </Badge>
      )}
    </Flex>
  );
}
