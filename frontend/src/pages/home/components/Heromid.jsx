import React from 'react';

export default function Heromid() {
  return (
    <>
      <div className='px-5 lg:px-36 md:py-5'>
        <div className='container'>
          <div className='flex flex-wrap items-center justify-between -mx-4'>
            <div className='flex justify-center w-full lg:w-1/2'>
              <div
                className='relative z-10 my-4'
                style={{ transform: 'rotate(-45deg)' }}
              >
                <div className='w-48 h-48 overflow-hidden rounded-lg shadow-lg'>
                  <img
                    src='https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg'
                    alt=''
                    className='object-cover w-full h-full'
                  />
                </div>
              </div>
              <div
                className='relative z-10 my-4'
                style={{ transform: 'rotate(0deg)' }}
              >
                <div className='w-48 h-48 overflow-hidden rounded-lg shadow-lg'>
                  <img
                    src='https://images.unsplash.com/photo-1692726293166-7d1f95a4319d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    alt=''
                    className='object-cover w-full h-full'
                  />
                </div>
              </div>
              <div
                className='relative z-10 my-4'
                style={{ transform: 'rotate(45deg)' }}
              >
                <div className='w-48 h-48 overflow-hidden rounded-lg shadow-lg'>
                  <img
                    src='https://images.unsplash.com/photo-1556648011-e01aca870a81?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    alt=''
                    className='object-cover w-full h-full'
                  />
                </div>
              </div>
            </div>
            <div className='w-full lg:w-1/2 xl:w-5/12'>
              <div className='mt-10 ml-12 lg:mt-0'>
                <span className='block mb-2 text-lg font-semibold text-green-500'>
                  Spend Your Vacation
                </span>
                <h2 className='mb-8 text-3xl font-bold text-dark sm:text-4xl '>
                The Perfect Jungle Setting
                </h2>
                <p className='mb-5 text-base text-body-color'>
                Nestled on the banks of the Kirindi Oya River and surrounded by wild jungles, bubbling mountain streams, and abundant flora and fauna. It’s
                 the perfect setting for the many adventure activities provided at the resort or simply a place to be still and merge with nature.
                </p>
                <p className='mb-12 text-base text-body-color'>
                Offers you the perfect excuse to switch off your mobile phone and leave your work and laptop at home. Cradled in the valley of Ella Gap, our location limits access to telephones and internet
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
