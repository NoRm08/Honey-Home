import React from 'react';
import { ChakraProvider, Box, Tabs, TabList, Tab, TabPanels, TabPanel, Heading } from '@chakra-ui/react';

import { useAppSelector } from '../../../redux/hooks';
import UserOrderCard from './UserOrderCard';
import type { OrderType } from '../../../types/order';

function UserOrderTabs(): JSX.Element {
  const orders = useAppSelector((store) => store.orders);
  const user = useAppSelector((store) => store.auth.user);

  const userOrders = orders.filter((order) => order.userId === user.id);

  const filterOrdersByStatus = (status): OrderType[] =>
    userOrders.filter((order) => order.status === status);

  const activeOrders = filterOrdersByStatus('active');
  const pendingOrders = filterOrdersByStatus('pending');
  const closedOrders = filterOrdersByStatus('closed');
  return (
    <ChakraProvider>
      <Box  mr='auto' ml='auto' style={{width: '55%'}}p={4} >
        <Tabs isFitted variant="enclosed" >
          <TabList mb="1em">
            <Tab  backgroundColor='whitesmoke'><strong>В Ожидании</strong></Tab>
            <Tab  backgroundColor='whitesmoke'><strong>Активные</strong></Tab>
            <Tab  backgroundColor='whitesmoke'><strong>Выполненные</strong></Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {pendingOrders
                .filter((order) => order.status === 'pending')
                .map((order) => (
                  <UserOrderCard key={order.id} order={order} />
                ))}
            </TabPanel>
            <TabPanel>
              {activeOrders
                .filter((order) => order.status === 'active')
                .map((order) => (
                  <UserOrderCard key={order.id} order={order} />
                ))}
            </TabPanel>
            <TabPanel>
              {closedOrders
                .filter((order) => order.status === 'closed')
                .map((order) => (
                  <UserOrderCard key={order.id} order={order} />
                ))}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </ChakraProvider>
  );
}

export default UserOrderTabs;
