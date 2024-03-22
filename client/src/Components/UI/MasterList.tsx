import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import MasretCardMainPage from './MasretCardMainPage';

export default function MasterList(): JSX.Element {
  const masters = useAppSelector((store) => store.masters.masters);
  return (<>
    {masters?.map((master) => <MasretCardMainPage master={master} key={master?.id} />)}</>
  );
}
