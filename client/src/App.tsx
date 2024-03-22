import React, { useEffect } from 'react';
import { Route, Routes, redirect } from 'react-router-dom';
import type { AxiosError } from 'axios';
import { Box } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import NavBar from './Components/UI/NavBar';
import { apiInstance } from './services/apiService';
import { checkThanck, refreshThanck } from './redux/auth/authThanck';
import MainPage from './Components/Pages/MainPage';
import Loader from './Components/HOC/LoadingRouter';

import UserPage from './Components/Pages/UserPage';
import { thunkGetSkill } from './redux/skill/skillThunk';

import MasterPage from './Components/Pages/MasterPage';

import { loadMastersThanck } from './redux/master/masterThanck';
import AdminPage from './Components/Pages/AdminPage';
import PrivateRouter from './Components/HOC/PrivateRouter';
import { thunkGetOrders } from './redux/order/orderThunk';
import OrdersTab from './Components/UI/adminPage/OrdersTab';
import MasterContent from './Components/UI/adminPage/MasterContent';
import UserContent from './Components/UI/adminPage/UserContent';
import { usersGetThunk } from './redux/user/userThunk';
import useAxiosInterceptor from './utils/useAxiosInterceptor';
import { authInstance } from './services/authService';
import { masterInstance } from './services/masterService';
import { orderInstance } from './services/orderService';
import { skillInstance } from './services/skillService';
import { userInstance } from './services/userService';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const { user, accessToken } = useAppSelector((store) => store.auth);

  // console.log(user);

  useEffect(() => {
    void dispatch(checkThanck());
    void dispatch(usersGetThunk());
    void dispatch(thunkGetSkill());
    void dispatch(loadMastersThanck());
    void dispatch(thunkGetOrders());
  }, []);

  useAxiosInterceptor(apiInstance);
  useAxiosInterceptor(authInstance);
  useAxiosInterceptor(masterInstance);
  useAxiosInterceptor(orderInstance);
  useAxiosInterceptor(skillInstance);
  useAxiosInterceptor(userInstance);

  return (
    <Box bg={useColorModeValue('#CBD5E0', 'gray.800')}>
      <NavBar />
      <Loader isLoading={user.status === 'pending'}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route
            element={
              <PrivateRouter
                isAllowed={user.status === 'authenticated' && user.role === 'user'}
                redirectPath="/"
                hasSidebar={false}
              />
            }
          >
            <Route path="/userpage" element={<UserPage />} />
          </Route>

          <Route
            element={
              <PrivateRouter
                isAllowed={user.status === 'authenticated' && user.role === 'master'}
                redirectPath="/"
                hasSidebar={false}
              />
            }
          >
            <Route path="/masters_Office" element={<MasterPage />} />
          </Route>

          <Route
            path="/admin"
            element={<PrivateRouter isAllowed={user?.role === 'admin'} redirect="/" hasSidebar />}
          >
            {/* <Route index element={<AdminPage />} /> */}
            <Route path="orders" element={<OrdersTab />} />
            <Route path="masters" element={<MasterContent />} />
            <Route path="users" element={<UserContent />} />
          </Route>
        </Routes>
      </Loader>
    </Box>
  );
}

export default App;
