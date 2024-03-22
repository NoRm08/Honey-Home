import React from 'react';
import SideBar from '../UI/AdminSideBar';

type AdminPageLayoutProps = {
  children: JSX.Element;
};

export default function AdminPageLayout({ children }: AdminPageLayoutProps): JSX.Element {
  const user = { status: 'admin' };
  if (user.status !== 'admin') return children;
  return (
    <>
      <SideBar />
      {children}
    </>
  );
}
