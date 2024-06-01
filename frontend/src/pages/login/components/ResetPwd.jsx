import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ResetPwd() {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleResetPassword = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/forgot-password/', {
        email: email // Assuming email is defined elsewhere
      });
      console.log(response.data); // Log the response if needed
      toast.success('Email Sent'); // Display success toast message
    } catch (error) {
      console.error('Error sending reset password email:', error);
      // Optionally, you can handle errors here, such as displaying an error message to the user
    }
  };

  return (
    <div className='relative flex flex-col text-gray-700 bg-black bg-opacity-70 shadow-none rounded-xl bg-clip-border mt-[300px] p-10 mb-20'>
      <h4 className='block font-sans text-4xl antialiased font-semibold leading-snug tracking-normal text-center text-white'>
        Reset Password
      </h4>
      <p className='block mt-1 font-sans text-xl antialiased font-normal leading-relaxed text-center text-white text-mbase'>
        Enter Your valid Email to receive the Link
        <br /> to Reset your account password
      </p>
      <form className='max-w-screen-lg mt-8 mb-2 w-80 sm:w-96'>
        <div className='flex flex-col gap-6 mb-1'>
          <h6 className='block mb-[-12px] font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-white mt-[-20px]'>
            Your Email
          </h6>
          <div className='relative h-11 w-full min-w-[200px]'>
            <input
              placeholder='Ella@gmail.com'
              className='peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50'
              onChange={handleEmailChange}
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
          </div>
        </div>

        <button
          onClick={handleResetPassword}
          className='mt-5 block w-full select-none rounded-lg bg-green-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
          type='button'
        >
          Get Link
        </button>
      </form>
    </div>
  );
}
