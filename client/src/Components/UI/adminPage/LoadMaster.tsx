import React, { useState } from 'react';
import { Box, CheckboxGroup, Flex, Text } from '@chakra-ui/react';
import { useAppDispatch } from '../../../redux/hooks';
import { setDateExp } from '../../../redux/user/userSlice';

type DayBlockProps = {
  dayOfMonth: number;
  color: string;
};

function DayBlock({ dayOfMonth, color }: DayBlockProps): JSX.Element {
  const [isPressed, setPressed] = useState(false);
  const dispatch = useAppDispatch();
  const clickHandler = (e) => {
    const dateExp = new Date(2023, 11, dayOfMonth+1);
    dispatch(setDateExp(dateExp));
    setPressed(!isPressed);
  };
  return (
    <Box
      onClick={clickHandler}
      mb="2"
      flex="1"
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      p={5}
      borderRadius="md"
      bg={isPressed ? 'green.800' : color}
      color="white"
      border="3px double white" // Добавлен стиль для двойной рамки
      width="10" // Указана ширина блока
      height="10" // Указана высота блока
      boxSizing="border-box" // Указан box-sizing для правильного расчета ширины блока
    >
      <Text fontSize="lg">{dayOfMonth}</Text>
    </Box>
  );
}

export default function LoadMaster({ daysLoad }): JSX.Element {
  const today = new Date();
  const today1 = new Date();
  today1.setDate(today1.getDate() + 1);
  const today2 = new Date();
  today2.setDate(today2.getDate() + 2);
  const today3 = new Date();
  today3.setDate(today3.getDate() + 3);
  const today4 = new Date();
  today4.setDate(today4.getDate() + 4);
  const today5 = new Date();
  today5.setDate(today5.getDate() + 5);
  const today6 = new Date();
  today6.setDate(today6.getDate() + 6);
  const daysOfMonth = [
    today.getDate(),
    today1.getDate(),
    today2.getDate(),
    today3.getDate(),
    today4.getDate(),
    today5.getDate(),
    today6.getDate(),
  ];

  // Пример цветов для каждого дня недели
  const colors = {
    free: 'green.400',
    busy: 'gray.400',
    semibusy: 'yellow.500',
  };

  const dayColors = daysOfMonth.map((day) => {
    const loadToDay = daysLoad[day];
    if (!loadToDay) return 'green.400';
    if (loadToDay > 0 && loadToDay < 3) return 'yellow.500';
    if (loadToDay >= 3) return 'red.500';
    return 'gray.400';
  });
  return (
    <Box>
      <Flex>
        {daysOfMonth.map((day, index) => (
          <DayBlock key={index} dayOfMonth={day} color={dayColors[index]} />
        ))}
      </Flex>
    </Box>
  );
}
