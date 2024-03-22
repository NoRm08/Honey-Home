import { Box, Button, Flex, useColorMode, Input, Select } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import MasterList from '../MasterList';
import SignupMasterModalWindow from '../authPages/SignupMasterModalWindow';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { filterByName, filterByOption, setMasters } from '../../../redux/master/masterSlice';

export default function MasterContent(): JSX.Element {
  const { colorMode, toggleColorMode } = useColorMode();
  const [showMaster, setShowMaster] = useState<boolean>(false);
  const [filterParam, setFilterParam] = useState<string>(''); // параметр для фильтрации
  const masters = useAppSelector((store) => store.masters.masters);
  const dispatch = useAppDispatch();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(filterByName(event.target.value));
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    dispatch(filterByOption(event.target.value))
  };

  return (
    <Flex direction="column" align="center" flexGrow='1'>
      <Box m={4}>
        <Button
          as="a"
          fontSize="sm"
          fontWeight={600}
          color="white"
          bg={colorMode === 'light' ? 'green.600' : 'green.800'}
          onClick={() => setShowMaster(true)}
          _hover={{
            bg: colorMode === 'light' ? 'green.500' : 'green.700',
          }}
          minW="120px"
        >
          Добавить
        </Button>
      </Box>

      <Flex mb={16} >
        <Input
          placeholder="Поиск по имени"
          onChange={handleSearchChange}
          mr={2}
        />
        <Select
          placeholder="Фильтр по параметрам"
          value={filterParam}
          onChange={handleFilterChange}
        >
          <option value="raitingAsc">Рейтинг по возрастанию</option>
          <option value="raitingDesc">Рейтинг по убыванию</option>
          <option value="expAsc">Опыт по возростанию</option>
          <option value="expDesc">Опыт по убыванию</option>
        </Select>
      </Flex>

      <Flex flexWrap="wrap" justifyContent="center" gap={4} width="100%">
        <MasterList masters={masters} />
      </Flex>

      <SignupMasterModalWindow showMaster={showMaster} handlerClose={() => setShowMaster(false)} />
    </Flex>
  );
}
