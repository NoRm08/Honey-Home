import React from 'react';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import LoginForm from './LoginForm';

type LoginModalWindowPropsType = {
  show: boolean;
  handlerClose: () => void;
};

export default function LoginModalWindow({ show, handlerClose }: LoginModalWindowPropsType):JSX.Element {
  return (
    <Modal isOpen={show} onClose={handlerClose} >
        <ModalOverlay />
        <ModalContent pb={5}>
          <ModalHeader>Войти</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <LoginForm handlerClose={handlerClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
  );
}
