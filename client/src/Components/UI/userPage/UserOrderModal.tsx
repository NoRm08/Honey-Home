import {
  Button,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
  Stack,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { thunkAddOrder } from '../../../redux/order/orderThunk';

type OrderModalWindowPropsType = {
  show: boolean;
  handlerClose: () => void;
};

export default function OrderModalWindow({
  show,
  handlerClose,
}: OrderModalWindowPropsType): JSX.Element {
  const skills = useAppSelector((store) => store.skills);
  const [problems, setProblems] = useState([]);
  const [comment, setComment] = useState('');
  const toast = useToast();
  

  const dispatch = useAppDispatch();

  const changeHandler = (e) => {
    const currentSkills = skills.filter((skill) => skill.name === e.target.value);
    setProblems(currentSkills[0]?.Problems || []);
  };

  return (
    <Modal isOpen={show} onClose={handlerClose}>
      <ModalOverlay />
      <ModalContent pb={5}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = {
              problemId: problems[0]?.id,
              comment,
            };
            if (formData.problemId) {
            void dispatch(thunkAddOrder(formData)).then(()=>{
              handlerClose();
            });
            setComment('');
            e.currentTarget.reset();
          } else {
            toast({
              title: 'Ошибка',
              description: 'Выбирите проблему',
              status: 'error',
              duration: 1000,
              isClosable: true,
            });
          }

        }}
          
        >
          <ModalHeader>Какая возникла проблема?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <Select onChange={changeHandler} placeholder='Выбери категорию'>
                {skills?.map((skill) => (
                  <option key={skill.id} value={skill.name}>
                    {skill.name}
                  </option>
                ))}
              </Select>
              <Select placeholder='Выбери проблему'>
                {problems?.map((problem) => (
                  <option key={problem.id} value={problem.name}>
                    {problem.name}
                  </option>
                ))}
              </Select>
              <FormLabel>Комментарий</FormLabel>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Введите комментарий"
                name="comment"
                size="md"
              />
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              Отправить
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
