import React, { useState } from 'react';

import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import { IoBriefcaseOutline, IoHammerOutline, IoTimeOutline } from 'react-icons/io5';
import type { ReactElement } from 'react';

type FeatureProps = {
  text: string;
  iconBg: string;
  icon?: ReactElement;
};

function Feature({ text, icon, iconBg }: FeatureProps) {
  return (
    <Stack direction="row" align="center">
      <Flex w={8} h={8} align="center" justify="center" rounded="full" bg={iconBg}>
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
}
export default function MissionMain() {
  return (
    <Container maxW="5xl" py={12}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={4}>
          <Text
            textTransform="uppercase"
            color="blue.400"
            fontWeight={600}
            fontSize="sm"
            bg={useColorModeValue('blue.50', 'blue.900')}
            p={2}
            alignSelf="flex-start"
            rounded="md"
          >
            Наша миссия
          </Text>
          {/* <Heading>A digital Product design agency</Heading> */}
          <Text color="gray.500" fontSize="lg">
            Миссия Honey Home заключается в том, чтобы стать надежным компаньоном для наших клиентов
            в решении разнообразных бытовых проблем. Мы стремимся обеспечивать высококачественные
            услуги по ремонту и обслуживанию бытовой техники, электроприборов, сантехники и других
            устройств, обеспечивая комфорт и безопасность в доме. Наша цель - предоставить
            профессиональное решение каждой задачи, поддерживая клиентов в любое время и делая их
            быт максимально беспроблемным.
          </Text>
          <Stack
            spacing={4}
            divider={<StackDivider borderColor={useColorModeValue('gray.100', 'gray.700')} />}
          >
            <Feature
              icon={<Icon as={IoBriefcaseOutline} color="yellow.500" w={5} h={5} />}
              iconBg={useColorModeValue('yellow.100', 'yellow.900')}
              text="Работают профессионалы"
            />

            <Feature
              icon={<Icon as={IoTimeOutline} color="green.500" w={5} h={5} />}
              iconBg={useColorModeValue('green.100', 'green.900')}
              text="Поддержка 24/7"
            />
            <Feature
              icon={<Icon as={IoHammerOutline} color="purple.500" w={5} h={5} />}
              iconBg={useColorModeValue('purple.100', 'purple.900')}
              text="Качественные ремонт"
            />
          </Stack>
        </Stack>
        <Flex>
          <Image
            rounded="md"
            alt="feature image"
            src="https://www.openbusiness.ru/upload/iblock/1d0/9sq21kk4ojz1myj8b2r48yy77x8tzfie/remont.jpg"
            objectFit="cover"
          />
        </Flex>
      </SimpleGrid>
    </Container>
  );
}
