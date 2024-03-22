import React from 'react';
import { Box, Flex, Input, Select } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import UserCard from './UserCard';
import { userFilterByName, userFilterByOption } from '../../../redux/user/userSlice';

export default function UserContent(): JSX.Element {
  const users = useAppSelector((store) => store.users.users);
  const dispatch = useAppDispatch();
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(userFilterByName(e.target.value));
  };
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    dispatch(userFilterByOption(e.target.value));
  };
  return (
    <Flex flexDirection="column" flexGrow='1'>
      <Flex mb={16}>
        <Input placeholder="Поиск по имени" onChange={handleSearchChange} mr={2} />
        <Select placeholder="Фильтр по параметрам" onChange={handleFilterChange}>
          <option value="subsDesc">По подписке: есть</option>
          <option value="subsAsc">По подписке: нет</option>
        </Select>
      </Flex>
      <Box>
        <Flex flexWrap="wrap" justifyContent="center" gap={4}>
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </Flex>
      </Box>
    </Flex>
  );
}
