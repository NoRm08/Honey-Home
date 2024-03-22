import React, { useEffect, useState } from 'react';
import {
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Button
} from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { thunkEditOrder } from '../../../redux/order/orderThunk';
import type { OrderAddFormType, OrderType } from '../../../types/order';

type CommentEditModalPropsType = {
  order: OrderType;
  openModal: boolean;
  closeModal: () => void;
};

export default function CommentEditModal({
  order,
  openModal,
  closeModal,
}: CommentEditModalPropsType): JSX.Element {
  const user = useAppSelector((store) => store.auth.user);

  const [userComment, setUserComment] = useState({
    comment: '',
  });

  useEffect(() => {
    if (user.status === 'authenticated') {
      setUserComment({
        comment: order.comment || '',
      });
    }
  }, [user.status]);

  const dispatch = useAppDispatch();
  return (
    <Modal isOpen={openModal} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent pb={5}>
        <ModalHeader>Изменить Комментарий</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = Object.fromEntries(new FormData(e.currentTarget));
              formData.id = order.id;
              void dispatch(thunkEditOrder(formData)).then(() => closeModal());
            }}
          >
            <FormControl mt={4}>
              <Input
                name="comment"
                placeholder="Введите текст"
                value={userComment.comment}
                onChange={(e) => setUserComment({ ...userComment, comment: e.target.value })}
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
