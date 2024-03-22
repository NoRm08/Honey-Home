import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
  Image,
  Avatar,
  Text,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import LoginModalWindow from './authPages/LoginModalWindow';
import SignupModalWindow from './authPages/SignupModalWindow';
import SignupMasterModalWindow from './authPages/SignupMasterModalWindow';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logoutThanck } from '../../redux/auth/authThanck';

function Logo():JSX.Element {
  return (
    <Text
      mt='3'
      fontSize="2xl"
      fontWeight="bold"
      bgGradient="linear(to-r, green.600, green.400)"
      bgClip="text"
    >
      HoneyHome
    </Text>
  );
};

export default function NavBar(): JSX.Element {
  const user = useAppSelector((store) => store.auth.user);
  const dispatch = useAppDispatch();
  const { colorMode, toggleColorMode } = useColorMode();
  const [show, setShow] = useState<boolean>(false);
  const [showSinup, setShowSinup] = useState<boolean>(false);
  const [showMaster, setShowMaster] = useState<boolean>(false);
  const navigate = useNavigate();
  
  
  return (
    <>
      <Box bg={useColorModeValue('gray.200', 'gray.900')} px={4}>
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <Box>
            <Link to="/" style={{ cursor: 'pointer' }}>
              {' '}
              {Logo()}
            </Link>
          </Box>

          <Flex alignItems="center">
            <Stack direction="row" spacing={7}>
              <Stack flex={{ base: 1, md: 0 }} justify="flex-end" direction="row" spacing={6}>
                {user.status === 'authenticated' ? (
                  <Button
                    as="a"
                    display={{ base: 'inline-flex', md: 'inline-flex' }}
                    fontSize="sm"
                    fontWeight={600}
                    color="white"
                    bg={colorMode === 'light' ? 'gray.400' : 'blue.800'}
                    onClick={() => {
                      void dispatch(logoutThanck());
                      navigate('/');
                    }}
                    _hover={{
                      bg: colorMode === 'light' ? 'gray.300' : 'blue.700',
                    }}
                  >
                    Выйти
                  </Button>
                ) : (
                  <>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button
                        as="a"
                        display={{ base: 'inline-flex', md: 'inline-flex' }}
                        fontSize="sm"
                        fontWeight={600}
                        color="white"
                        bg={colorMode === 'light' ? 'gray.400' : 'blue.800'}
                        onClick={() => setShow(true)}
                        sx={{ cursor: 'pointer' }}
                        _hover={{
                          bg: 'green.500',
                        }}
                      >
                        Войти
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button
                        as="a"
                        display={{ base: 'inline-flex', md: 'inline-flex' }}
                        fontSize="sm"
                        fontWeight={600}
                        color="white"
                        bg={colorMode === 'light' ? 'gray.400' : 'blue.800'}
                        onClick={() => setShowSinup(true)}
                        sx={{ cursor: 'pointer' }}
                        _hover={{
                          bg: 'green.500',
                        }}
                      >
                        Зарегистрироваться
                      </Button>
                    </motion.div>
                  </>
                )}
              </Stack>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
              {user.status === 'authenticated' && user.role === 'user' ? (
                <Link to="/userpage" style={{ cursor: 'pointer' }}>
                  <Avatar name="Dan Abrahmov" src={`http://localhost:3001/${user.img}`} />
                </Link>
              ) : user.status === 'authenticated' && user.role === 'master' ? (
                <Link to="/masters_Office" style={{ cursor: 'pointer' }}>
                  <Avatar name="Dan Abrahmov" src={`http://localhost:3001/${user.img}`} />
                </Link>
              ) : (
                <Avatar name="Guest" src="http://localhost:3001/images/defoultMasterImg.jpeg" />
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
      <LoginModalWindow show={show} handlerClose={() => setShow(false)} />
      <SignupModalWindow showSinup={showSinup} handlerClose={() => setShowSinup(false)} />
      <SignupMasterModalWindow showMaster={showMaster} handlerClose={() => setShowMaster(false)} />
    </>
  );
}
