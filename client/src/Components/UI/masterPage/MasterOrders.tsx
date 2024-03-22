import React from 'react';
import { Box, ChakraProvider, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useAppSelector } from '../../../redux/hooks';
import type { MasterType } from '../../../types/auth/index';
import OrderCard from './OrderCard';

type MasterProps = {
  selectedMaster: MasterType | undefined;
};

export default function MasterOrders({ selectedMaster }: MasterProps): JSX.Element {
  const orders = useAppSelector((store) => store.orders) || [];
  const masterOrder = selectedMaster
    ? orders.filter((order) => order.masterId === selectedMaster.id)
    : [];
  // console.log('ORDERS', orders, 'MasterOrders:', masterOrder);

  return (
    <ChakraProvider>
      <Box p={4}>
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab backgroundColor="whitesmoke">
              <strong>Активные</strong>
            </Tab>
            <Tab backgroundColor="whitesmoke">
              <strong>Выполненные</strong>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {masterOrder
                .filter((order) => order.status === 'active')
                .map((order) => (
                  <OrderCard key={order.id} masterOrder={order} />
                ))}
            </TabPanel>
            <TabPanel>
              {masterOrder
                .filter((order) => order.status === 'closed')
                .map((order) => (
                  <OrderCard key={order.id} masterOrder={order} />
                ))}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </ChakraProvider>
  );
}
