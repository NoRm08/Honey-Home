import { ListItem, Text, UnorderedList, Flex, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import Footer from '../UI/Footer';
import Test from '../UI/MissionMain';
import SimpleAccordion from '../UI/Accordion';
import ButtonPay from '../UI/ButtonPay';
import NewCarusel from '../UI/NewCarusel';

export default function MainPage(): JSX.Element {
  const masters = useAppSelector((store) => store.masters.masters);

  const user = useAppSelector((store)=> store.auth.user)
  console.log('---->>>>>',user)
  return (
    <>
      <ButtonPay />
      <Test />
      <Flex
        style={{
          justifyContent: 'space-between',
          maxWidth: '1000px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <SimpleAccordion
          name="Наши услуги"
          text={
            <UnorderedList>
              <ListItem>Ремонт электроприборов и электротехники.</ListItem>
              <ListItem>Замена и ремонт сантехнического оборудования.</ListItem>
              <ListItem>Обслуживание систем отопления и кондиционирования воздуха.</ListItem>
              <ListItem>Устранение неисправностей в электросетях и розетках.</ListItem>
              <ListItem>Решение проблем с бытовыми приборами и многое другое.</ListItem>
            </UnorderedList>
          }
        />
        <SimpleAccordion
          name="Наши идеи"
          text="
          Мы понимаем, что бытовые проблемы могут возникнуть в самый неподходящий момент, поэтому
          Honey Home предлагает гибкие подписки. С нашей подпиской, вы получите регулярные визиты
          наших мастеров два раза в месяц для предотвращения и решения любых проблем в вашем доме.
            "
        />
        <SimpleAccordion
          name="Мы предлагаем"
          text="
          Надежность, качество и комфорт - вот что мы предлагаем нашим клиентам. Присоединяйтесь к
          Honey Home и забудьте о бытовых хлопотах!
            "
        />
      </Flex>
      <Text
        textTransform="uppercase"
        color="blue.400"
        fontWeight={600}
        fontSize="sm"
        marginLeft="auto"
        marginRight="auto"
        marginTop="50px"
        marginBottom="100px"
        width="150px"
        bg={useColorModeValue('blue.50', 'blue.900')}
        p={3}
        alignSelf="flex-start"
        rounded="md"
      >
        Наши мастера
      </Text>
      <NewCarusel/>
      <Footer />
    </>
  );
}
