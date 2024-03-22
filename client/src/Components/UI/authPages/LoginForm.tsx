import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import type { LoginFormData } from '../../../types/auth';
import { useAppDispatch } from '../../../redux/hooks';
import { loginThanck } from '../../../redux/auth/authThanck';


type LoginFormPropsType = {
  handlerClose: () => void;
};

export default function LoginForm({ handlerClose }: LoginFormPropsType): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast()
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = Object.fromEntries(new FormData(e.currentTarget)) as LoginFormData;
        dispatch(loginThanck(formData))
          .unwrap()
          .then(({ user }) => {
            if (user.status === 'authenticated') {
              if (user.role === 'user') navigate('/userpage');
              if (user.role === 'master') navigate('/masters_Office');
              if (user.role === 'admin') navigate('/admin/orders');
            }
            form.reset();
            toast({
              title: 'Account authenticated.',
              description: "Welcom to our app.",
              status: 'success',
              duration: 3000,
              isClosable: true,
            })
          })
          .catch(() => {
            toast({
              title: 'Account not authenticated.',
              description: "Error with your email or password.",
              status: 'error',
              duration: 3000,
              isClosable: true,
            })});
        handlerClose();
      }}
    >
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input placeholder="Enter email" name="email" type="email" />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input name='password' placeholder='Enter password' type={showPassword ? 'text' : 'password'} />
          <InputRightElement h="full">
            <Button
              variant="ghost"
              onClick={() => setShowPassword((showPassword) => !showPassword)}
            >
              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button type="submit" mt={4} colorScheme="green">
        Enter
      </Button>
    </form>
  );
}