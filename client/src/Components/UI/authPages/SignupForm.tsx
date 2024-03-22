import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { confirmThanck, signupThanck } from '../../../redux/auth/authThanck';
import { useAppDispatch } from '../../../redux/hooks';
import validPassword from '../../../utils/validPassword';

type SignupFormPropsType = {
  handlerClose: () => void;
};

export default function SignupForm({ handlerClose }: SignupFormPropsType): JSX.Element {
  const [show, setShow] = useState(false);
  const [inputCode, setinputCode] = useState({
    confirmationCode: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({
    password: '',
    name: '',
    email: '',
    telephone: '',
  });
  const onChangeHandlerCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputCode((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInput((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  return (
    <> 
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void dispatch(confirmThanck(input));
          setShow(true);
          // void dispatch(signupThanck(input))
          //   .unwrap()
          //   .then(() => {
          //     handlerClose();
          //     toast({
          //       title: 'Account created.',
          //       description: "We've created your account for you.",
          //       status: 'success',
          //       duration: 3000,
          //       isClosable: true,
          //     });
          //   })
          //   .catch(() => {
          //     toast({
          //       title: 'Account not created.',
          //       description: 'Error with your email or password.',
          //       status: 'error',
          //       duration: 3000,
          //       isClosable: true,
          //     });
          //   });
        }}
      >
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            onChange={onChangeHandler}
            value={input.name}
            type="text"
            placeholder="Name"
            name="name"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input
            onChange={onChangeHandler}
            value={input.email}
            type="email"
            placeholder="Enter email"
            name="email"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Phone number</FormLabel>
          <Input
            onChange={onChangeHandler}
            value={input.telephone}
            type="number"
            placeholder="Enter phone number"
            name="telephone"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              style={{ color: validPassword(input.password) ? 'green' : 'red' }}
              onChange={onChangeHandler}
              value={input.password}
              name="password"
              placeholder="Enter password"
              type={showPassword ? 'text' : 'password'}
            />
            <InputRightElement h="full">
              <Button
                variant="ghost"
                onClick={() => setShowPassword((showPassword) => !showPassword)}
              >
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormHelperText>6 символов, строчные и заглавные буквы , цифры</FormHelperText>
        </FormControl>
        {validPassword(input.password) &&
        input.email.length > 0 &&
        input.name.length &&
        input.telephone.length ? (
          <Button
            mt={4}
            type="submit"
            onClick={() => setShow(!show)}
            colorScheme="green"
            variant="solid"
          >
            Дальше
          </Button>
        ) : (
          <></>
        )}
      </form>
      {show ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // console.log('INPUT CODE', inputCode);
            void dispatch(signupThanck({ email: input.email, ...inputCode }))
              .unwrap()
              .then(() => {
                handlerClose();
                toast({
                  title: 'Account created.',
                  description: "We've created your account for you.",
                  status: 'success',
                  duration: 3000,
                  isClosable: true,
                });
              })
              .catch(() => {
                toast({
                  title: 'Account not created.',
                  description: 'Error with your email or password.',
                  status: 'error',
                  duration: 3000,
                  isClosable: true,
                });
              });
            handlerClose();
          }}
        >
          <FormControl>
            <FormLabel>Подтверждение почты</FormLabel>
            <Input
              onChange={onChangeHandlerCode}
              value={inputCode.confirmationCode}
              type="text"
              placeholder="Enter code"
              name="confirmationCode"
            />
          </FormControl>
          <Button mt={4} type="submit" colorScheme="green" variant="solid">
            Зарегистрироваться
          </Button>
        </form>
      ) : (
        <> </>
      )}
    </>
  );
}
