import React, { useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import OrdersTab from '../UI/adminPage/OrdersTab';
import AdminSideBar from '../UI/AdminSideBar';
import { useAppDispatch } from '../../redux/hooks';
import { thunkGetOrders } from '../../redux/order/orderThunk';

export default function AdminPage(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(thunkGetOrders());
  }, []);
  return (
    <Flex>
      {/* <AdminSideBar /> */}
      {/* <Routes>
        <Route path="/orders" element={<OrdersTab />} />
        <Route path="/masters" element={<OrdersTab />} />
      </Routes> */}
    </Flex>
  );
}
