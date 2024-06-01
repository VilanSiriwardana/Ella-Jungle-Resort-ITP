import React from 'react';
import NavBarComponent from '../components/NavBarPackage';
import { Outlet } from 'react-router-dom';

export default function Custom() {
  return (
    <>
      <NavBarComponent />
      <Outlet />

      
    </>
  );
}
