import React from 'react';
import { Flex } from '@chakra-ui/react';
import UserProfile from '../UI/userPage/UserProfile';
import UserOrderTabs from '../UI/userPage/UserOrderTabs';

export default function UserPage(): JSX.Element {
  return (
    <Flex>
      <UserProfile />
      <UserOrderTabs />
    </Flex>
  );
}
