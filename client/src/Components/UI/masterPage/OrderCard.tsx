import { Badge, Flex, Text, useColorMode, Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import type { OrderType } from '../../../types/order';
import { thunkAcceptStatus } from '../../../redux/order/orderThunk';
import { useAppDispatch } from '../../../redux/hooks';

type MasterOrderCardType = {
  masterOrder: OrderType;
};

export default function OrderCard({ masterOrder }: MasterOrderCardType): JSX.Element {


  const dispatch = useAppDispatch();
  const [isButtonClicked, setButtonClicked] = useState(false);
  const handleButtonClick =  (): void => {
    setButtonClicked(true);

    try {
      void dispatch(thunkAcceptStatus(masterOrder.id));
    } catch (error) {
      setButtonClicked(false);
      console.error('Error while dispatching thunk:', error);
    }
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
      <Flex width="100%" direction="column" alignItems="flex-start">
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          Номер заявки: {masterOrder.id}
        </Text>
        <Text fontSize="md">
          <strong>Заказчик:</strong> {masterOrder.User.name}
        </Text>
        <Text fontSize="md">
          <strong>Комментарий:</strong>
          {masterOrder.comment}
        </Text>
        <Text fontSize="md">
          <strong>Услуга:</strong> {masterOrder.Problem?.name}
        </Text>
        <Text fontSize="md">
          <strong>Адрес:</strong> {masterOrder.User?.address}
        </Text>
        <Text fontSize="md">
          <strong>Дата создания:</strong> {masterOrder?.dateOpen.slice(0, 10)}
        </Text>
        {masterOrder.dateExp ? (
          <Text fontSize="md">
            <strong>Дата создания:</strong>{' '}
            {masterOrder.dateOpen ? masterOrder.dateOpen.slice(0, 10) : ''}
          </Text>
        ) : (
          ''
        )}
        {masterOrder.Master ? (
          <Text fontSize="md">
            <strong>Master:</strong> {masterOrder.Master.name}
          </Text>
        ) : (
          ''
        )}
      </Flex>
      {masterOrder.status === 'active' ? (
        <>
        {masterOrder.masterAccept ?(<Badge p={2} borderRadius={10} colorScheme="blue" fontSize="sm">
            На модерации
          </Badge>) :
          (<Badge p={2} borderRadius={10} colorScheme="blue" fontSize="sm">
            Активная
          </Badge>)
        }
          <Button
            onClick={handleButtonClick}
            p={2}
            margin={2}
            borderRadius={10}
            colorScheme={masterOrder.masterAccept ? 'blue' : 'green'}
            fontSize="sm"
          >
            {masterOrder.masterAccept ? 'Подтверждено' : 'Подтвердить'}
          </Button>
        </>
      ) : (
        <Badge p={2} borderRadius={10} colorScheme="blue" fontSize="sm">
          Закрыта
        </Badge>
      )}
    </Flex>
  );
}
