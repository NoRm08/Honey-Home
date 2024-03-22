import React, { useState } from 'react';
import { Button, FormControl, FormHelperText, FormLabel, Input } from '@chakra-ui/react';
import { useAppDispatch } from '../../../redux/hooks';
import validPassword from '../../../utils/validPassword';
import { signupMasterThanck } from '../../../redux/master/masterThanck';

type SignupMasterFormPropsType = {
  handlerClose: () => void;
};

export default function SignupMasterForm({ handlerClose }: SignupMasterFormPropsType): JSX.Element {
  const [input, setInput] = useState({
    email: '',
    name: '',
    password: '',
    experience: '',
    telephone: '',
  });
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  const dispatch = useAppDispatch();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void dispatch(signupMasterThanck(input));
        handlerClose();
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
        <FormLabel>Experience</FormLabel>
        <Input
          onChange={onChangeHandler}
          value={input.experience}
          type="text"
          placeholder="Enter expreience"
          name="experience"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Phone number</FormLabel>
        <Input
          onChange={onChangeHandler}
          value={input.telephone}
          type="text"
          placeholder="Enter phone number"
          name="telephone"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input
          style={{ color: validPassword(input.password) ? 'green' : 'red' }}
          onChange={onChangeHandler}
          value={input.password}
          type="password"
          placeholder="Password"
          name="password"
        />
        <FormHelperText>8 символов, строчные и заглавные буквы , цыфры</FormHelperText>
      </FormControl>
     
        <Button mt={4} type="submit" colorScheme="green" variant="solid">
          Submit
        </Button>
    </form>
  );
}
