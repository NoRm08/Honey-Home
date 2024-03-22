import React from 'react';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import SignupMasterForm from './SignupMasterForm';

type SignupModalWindowPropsType = {
  showMaster: boolean;
  handlerClose: () => void;
};

export default function SignupMasterModalWindow({
  showMaster,
  handlerClose,
}: SignupModalWindowPropsType): JSX.Element {
  return (
    <Modal isOpen={showMaster} onClose={handlerClose} >
        <ModalOverlay />
        <ModalContent pb={5}>
          <ModalHeader>Регистрация мастера</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <SignupMasterForm handlerClose={handlerClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
  );
}
