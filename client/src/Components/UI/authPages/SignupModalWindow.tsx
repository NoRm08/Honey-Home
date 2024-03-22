import React from 'react';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import SignupForm from './SignupForm';

type SignupModalWindowPropsType = {
  showSinup: boolean;
  handlerClose: () => void;
};

export default function SignupModalWindow({
  showSinup,
  handlerClose,
}: SignupModalWindowPropsType): JSX.Element {
  return (
    <Modal isOpen={showSinup} onClose={handlerClose} >
        <ModalOverlay />
        <ModalContent pb={5}>
          <ModalHeader>Регистрация</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <SignupForm handlerClose={handlerClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
  );
}
