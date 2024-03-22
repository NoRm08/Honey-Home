import React from 'react';
import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
  UnorderedList,
  ListItem,
  Grid,
} from '@chakra-ui/react';
import type { MasterType } from '../../types/auth';
import { useAppSelector } from '../../redux/hooks';

type MasretCardMainPagePropsType = {
  master: MasterType;
};

function MasretCardMainPage({ master }: MasretCardMainPagePropsType): JSX.Element {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < master?.raiting; i += 1) {
      stars.push(
        <img
          src="http://localhost:3001/images/icons8-star-48.png"
          alt="start"
          style={{ width: '30px' }}
        />,
      );
    }
    return stars;
  };
  const orders = useAppSelector((store) => store.orders);
  const masterOrder = orders.filter(
    (order) => order.masterId === master.id && order.status === 'closed',
  );
  return (
    <Center py={6}>
      <Box
        minWidth="270px"
        maxWidth="270px"
        h="400px"
        w="full"
        bg={useColorModeValue('#CBD5E0', 'gray.600')}
        boxShadow="2xl"
        rounded="md"
        overflow="visible"
      >
        <Flex justify="center">
          <Avatar
            size="xl"
            src={master.img}
            css={{
              border: '2px solid white',
            }}
          />
        </Flex>

        <Flex p={6} height="300px" flexDirection="column" justifyContent="space-between">
          <Stack spacing={0} align="center" mb={5} height="500px">
            <Heading fontSize="2xl" fontWeight={500} fontFamily="body">
              {master.name}
            </Heading>
            <UnorderedList>
              <Grid templateColumns="repeat(2, 1fr)" gap={5}>
                {master?.MasterSkills?.map((skill) => (
                  <ListItem key={skill.id}>{skill.Skill.name}</ListItem>
                ))}
              </Grid>
            </UnorderedList>
          </Stack>
          <Stack direction="row" justify="center" spacing={6}>
            <Stack marginTop="auto" marginBottom="0px" spacing={0} align="center">
              <Stack marginBottom="30px" direction="row">
                {renderStars()}
              </Stack>
              <Text color="blue.600" fontSize="2xl">
                {masterOrder.length}
              </Text>
              {/* <Text fontWeight={600}></Text> */}
              <Text mt="5px" fontSize="sm" color="black">
                Выполнено работ
              </Text>
            </Stack>
          </Stack>
        </Flex>
      </Box>
    </Center>
  );
}

export default React.memo(MasretCardMainPage);
