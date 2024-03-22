import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useToast,
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import type { OrderType } from '../../../types/order';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { addMaster } from '../../../redux/order/orderSlice';
import LoadMaster from './LoadMaster';
import type { MasterType } from '../../../types/auth';

type Props = {
  order: OrderType;
  isOpen: boolean;
  onClose: () => void;
};
export default function ChoiseMasterModal({ order, isOpen, onClose }: Props): JSX.Element {
  const masters = useAppSelector((store) => store.masters.masters);
  const orders = useAppSelector((store) => store.orders);
  const dateExp1 = useAppSelector((store) => store.users.dateExp);
  const [daysLoad, setDaysLoad] = useState({});
  const toast = useToast();

  // Получение скилов мастера
  const getSkills = (master: MasterType): string[] => {
    const skills = [];
    master.MasterSkills.forEach((skill) => skills.push(skill.Skill.name));
    return skills;
  };

  // Получение активных заявок для мастера
  const getActiveOrders = (id: number): OrderType[] => {
    const master = masters.find((el) => el.id === id);
    const activeOrders: OrderType[] = [];
    orders
      .filter((el) => el.status === 'active')
      .forEach((el) => {
        if (el.Master.id === master?.id) activeOrders.push(el);
      });
    return activeOrders;
  };

  // Получение дневной загрузки мастера
  const getDaysLoadMaster = (activeOrders: OrderType[]) => {
    const res = {};
    activeOrders.forEach((el) => {
      let day = el.dateExp.slice(8, 10);
      if (day.slice(0,1) === '0') day = day.slice(1);
      res[day] ? res[day]++ : (res[day] = 1);
    });
    return res;
  };

  const [showLoadMaster, setShowLoadMaster] = useState(false);
  const dispatch = useAppDispatch();
  const data = useRef({
    masterName: '',
    orderId: order.id,
    masterId: 0,
    dateExp: '',
  });
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    if (e.target.name === 'master') {
      const activeOrders = getActiveOrders(Number(e.target.value));
      setDaysLoad(getDaysLoadMaster(activeOrders));
      if (e.target.value) {
        data.current.masterId = Number(e.target.value);
        const curInd = masters.findIndex((master) => master.id === data.current.masterId);
        data.current.masterName = masters[curInd].name;
        setShowLoadMaster(true);
      } else {
        setShowLoadMaster(false);
      }
    }
    if (e.target.name === 'dateExp') {
      console.log(e.target.value)
      console.log(dateExp1.toISOString().split('T')[0])
      data.current.dateExp = e.target.value}
  };
  const acceptHandler = (): void => {
    data.current.dateExp = dateExp1.toISOString().split('T')[0];
    const dateExp = new Date(data.current.dateExp);
    const day = dateExp.getDate();
    console.log(day)
    dateExp.setHours(dateExp1.getDate()-1);
    const dayNow = new Date();
    const dayNow7 = new Date();
    dayNow7.setDate(dayNow7.getDate() + 7);
    if ((daysLoad[day] < 3 || !daysLoad[day]) && (dateExp >= dayNow && dateExp <= dayNow7)) {
      toast({
        title: 'Мастер выбран',
        description: 'Подтвердите заявку',
        status: 'success',
        duration: 1000,
        isClosable: true,
      });
      void dispatch(addMaster(data.current));
      setShowLoadMaster(false);
      onClose();
    } else if (!(dateExp >= dayNow && dateExp <= dayNow7)) {
      toast({
        title: 'Ошибка даты',
        description: 'Выбирите другой день',
        status: 'error',
        duration: 1000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Мастер занят',
        description: 'Выбирите другой день',
        status: 'error',
        duration: 1000,
        isClosable: true,
      });
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setShowLoadMaster(false);
        onClose();
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Выбрать мастера</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex
            width="auto"
            // height="240"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={4}
            bg="gray.100"
            alignItems="center"
            flexDirection="column"
            justifyContent="space-between"
            boxShadow="md"
            margin={5}
          >
            <Flex width="100%" direction="column" alignItems="flex-start">
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                Номер заявки: {order.id}
              </Text>
              <Text mb='2' fontSize="md">
                <strong>Создал:</strong> {order.User.name}
              </Text>
              <Text mb='4' fontSize="md">
                <strong>Услуга:</strong> {order.Problem.name}
              </Text>
              {order.Master ? (
                <Text fontSize="md">
                  <strong>Мастер:</strong> {order.Master.name}
                </Text>
              ) : (
                ''
              )}
            </Flex>
            <Select
              mb="2"
              onChange={changeHandler}
              placeholder="Выбрать мастера"
              name="master"
              bg="gray.300"
            >
              {masters
                ?.filter((master) => {
                  const skills = getSkills(master);
                  return skills.includes(order.Problem.Skill.name);
                })
                .map((master) => (
                  <option key={master.id} value={master.id}>
                    {master.name}
                  </option>
                ))}
            </Select>
            {showLoadMaster ? <LoadMaster daysLoad={daysLoad} /> : ''}
            {/* <Input onChange={changeHandler} type="date" name="dateExp" /> */}
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button onClick={acceptHandler} colorScheme="green" mr={3}>
            Назначить
          </Button>
          <Button colorScheme="blue" onClick={onClose}>
            Отмена
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
