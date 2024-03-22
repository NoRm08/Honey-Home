import { Box, Flex, Text, Badge, Image, Avatar } from '@chakra-ui/react';
import React from 'react';
import type { UserType } from '../../../types/auth';

type Props = {
  user: UserType;
};

export default function UserCard({ user }: Props): JSX.Element {
  return (
    <Box
      m={1}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      boxShadow="md"
      width="100%"
    >
      <Avatar name={user.name} src={`http://localhost:3001/${user.img}`} />
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="lg" fontWeight="bold">
          {user.name}
        </Text>
        {user.subscribeLevl === '0' ? (
          <Badge variant="outline" colorScheme="red" fontSize="sm">
            No Subscription
          </Badge>
        ) : (
          <Badge variant="solid" colorScheme="green" fontSize="sm">
            {`Subscribe Level: ${user.subscribeLevl}`}
          </Badge>
        )}
      </Flex>
        
      <Text mt={2} fontSize="sm">
        <strong>Email:</strong> {user.email}
      </Text>
      <Text fontSize="sm">
        <strong>Телефон:</strong> {user.telephone || 'N/A'}
      </Text>
      <Text fontSize="sm">
        <strong>Адрес:</strong> {user.address || 'N/A'}
      </Text>
      <Text fontSize="sm">
        <strong>Роль:</strong> {user.role || 'N/A'}
      </Text>
    </Box>
  );
}
