import React from 'react';
import { ChakraProvider, Box, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import AdminOrderCard from '../AdminOrderCard';
import { useAppSelector } from '../../../redux/hooks';

function OrdersTab():JSX.Element {
    const orders = useAppSelector((store)=> store.orders)
    const sortedOrders = [...orders].sort((a, b) => a.id - b.id);
    console.log(sortedOrders);

  return (
    <ChakraProvider>
      <Box p={4} width="100%">
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>В Ожидании</Tab>
            <Tab>Активные</Tab>
            <Tab>Выполненные</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
            {sortedOrders.filter((order) => order.status === 'pending').map((order) => (<AdminOrderCard key={order.id} order={order}/>))}
            </TabPanel>
            <TabPanel>
            {sortedOrders.filter((order) => order.status === 'active').map((order) => (<AdminOrderCard key={order.id} order={order}/>))}
            </TabPanel>
            <TabPanel>
                {sortedOrders.filter((order) => order.status === 'closed').map((order) => (<AdminOrderCard key={order.id} order={order}/>))}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </ChakraProvider>
  );
}

export default OrdersTab;