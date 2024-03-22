import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Image } from '@chakra-ui/image';
import { Input } from '@chakra-ui/input';
import { Box, Container } from '@chakra-ui/layout';
import { motion } from 'framer-motion';

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import React, { useState } from 'react';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { useAppDispatch } from '../../redux/hooks';
import { payThanck } from '../../redux/auth/authThanck';

type PayFormPropsType = {
  show: boolean;
  handlerClose: () => void;
};

export default function PayForm({ show, handlerClose }: PayFormPropsType): JSX.Element {
  const dispath = useAppDispatch();
  const [input, setInput] = useState({
    card: '',
    month: '',
    year: '',
    cvv: '',
  });
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  return (
    <Box>
      <Container style={{ backgroundColor: 'black' }}>
        <Modal isOpen={show} onClose={handlerClose}>
          <ModalOverlay />
          <ModalContent bg={useColorModeValue('#CBD5E0', 'gray.800')} sx={{ p: '20px' }}>
            <ModalHeader>Оплата подписки</ModalHeader>
            <Image src="https://cdn1.ozone.ru/s3/payform-pcidss/583d12c1bcba79ad4377579aa0394060323566a9/img/ps_logos.2cb4e77.png" />
            <ModalCloseButton />
            <ModalBody pb={6}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  void dispath(payThanck(input));
                  handlerClose();
                }}
              >
                <FormControl>
                  <FormLabel>Номер карты</FormLabel>
                  <Input
                    onChange={onChangeHandler}
                    value={input.card}
                    name="card"
                    sx={{ w: '264px' }}
                    placeholder="номер карты"
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Действует до</FormLabel>
                  <Input
                    onChange={onChangeHandler}
                    value={input.month}
                    name="month"
                    sx={{ w: '50px', h: '30px', p: '8px', mr: '5px' }}
                    placeholder="мм"
                  />
                  /
                  <Input
                    onChange={onChangeHandler}
                    value={input.year}
                    name="year"
                    sx={{ w: '50px', h: '30px', p: '8px', ml: '5px' }}
                    placeholder="гг"
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>CVV/CVC</FormLabel>
                  <Input
                    onChange={onChangeHandler}
                    value={input.cvv}
                    name="cvv"
                    type="password"
                    sx={{ w: '50px', h: '30px', p: '8px', mr: '5px' }}
                    placeholder="cvv"
                  />
                </FormControl>
                <ModalFooter>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    type="submit"
                    colorScheme="green"
                    bg="green.400"
                    rounded="full"
                    px={6}
                    _hover={{
                      bg: 'green.500',
                    }}
                  >
                    Оплатить
                  </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>

                  <Button
                    ml={3}
                    colorScheme="gray.400"
                    bg="gray.400"
                    rounded="full"
                    px={6}
                    _hover={{
                      bg: 'gray.600',
                    }}
                    onClick={handlerClose}
                  >
                    Cancel
                  </Button>
                  </motion.div>
                </ModalFooter>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Container>
    </Box>
  );
}
