import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';
import SideBar from '../UI/AdminSideBar';

type PrivateRouterProps = {
  children?: JSX.Element;
  isAllowed: boolean;
  redirectPath?: string;
  hasSidebar: boolean;
};

export default function PrivateRouter({
  children,
  isAllowed,
  redirectPath = '/',
  hasSidebar,
}: PrivateRouterProps): JSX.Element {
  if (!isAllowed) return <Navigate to={redirectPath} />;
  if (children) return children;
  if (hasSidebar)
    return (
      <Flex>
        <SideBar />
        <Outlet />
      </Flex>
    );
  return <Outlet />;
}
