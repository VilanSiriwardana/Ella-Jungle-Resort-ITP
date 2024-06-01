import React from 'react';
import back from '../../assets/back.png';
import { Outlet } from 'react-router-dom';

function SignInPage() {
  return (
    <div
      className='flex items-center justify-center h-[1200px] mt-[-450px] '
      style={{ backgroundImage: `url(${back})`, backgroundSize: 'cover' }}
    >
      <Outlet />
    </div>
  );
}

export default SignInPage;
