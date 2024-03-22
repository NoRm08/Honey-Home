import React, { useEffect, useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { refreshThanck, userEditThunk } from '../../../redux/auth/authThanck';
import type { EditUserFormData } from '../../../types/auth';

type UserEditModalPropsType = {
  isWindowOpen: boolean;
  closeWindow: () => void;
};

export default function UserEditModal({
  isWindowOpen,
  closeWindow,
}: UserEditModalPropsType): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.auth.user);
  const [userData, setUserData] = useState({
    name: '',
    address: '',
    telephone: '',
  });

  useEffect(() => {
    if (user.status === 'authenticated') {
      setUserData({
        name: user.name || '',
        address: user.address || '',
        telephone: user.telephone || '',
      });
    }
  }, [user.status]);

  return (
    <Modal isOpen={isWindowOpen} onClose={closeWindow}>
      <ModalOverlay />
      <ModalContent pb={5}>
        <ModalHeader>Введите новые данные</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = Object.fromEntries(new FormData(e.currentTarget));
              if (user.status === 'authenticated') formData.id = user.id;
              void dispatch(userEditThunk(formData)).then(() => {
                closeWindow();
              });
            }}
          >
            <FormControl>
              <FormLabel>Имя</FormLabel>
              <Input
                name="name"
                placeholder="Введите имя"
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Адрес</FormLabel>
              <Input
                name="address"
                placeholder="Укажите адрес"
                value={userData.address}
                onChange={(e) => setUserData({ ...userData, address: e.target.value })}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Номер телефона</FormLabel>
              <Input
                name="telephone"
                placeholder="Введите номер"
                value={userData.telephone}
                onChange={(e) => setUserData({ ...userData, telephone: e.target.value })}
              />
            </FormControl>
            <Button
              type="submit"
              p={2}
              margin={2}
              borderRadius={10}
              colorScheme="blue"
              fontSize="sm"
            >
              Сохранить
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
