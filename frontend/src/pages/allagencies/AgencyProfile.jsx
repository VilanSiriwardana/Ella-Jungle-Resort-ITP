import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardBody, Typography, Button } from '@material-tailwind/react';
import { DeleteAgency } from './components/DeleteAgency';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const images = require.context('../../assets', false, /\.(png|jpe?g|svg)$/);

const AgencyDetails = () => {
  const { id } = useParams();
  const [agency, setAgency] = useState(null);
  const { userInfo } = useSelector(state => state.auth);
  const user = useSelector(state => state.auth.userInfo);

  // Create a new object with isAdmin property set to false if it doesn't exist
  const updatedUserInfo = { ...userInfo };
  if (updatedUserInfo.isAdmin == null) {
    updatedUserInfo.isAdmin = false;
  }

  useEffect(() => {
    const fetchAgencyDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/agencies/get/${id}`
        );
        setAgency(response.data);
      } catch (error) {
        console.error('Error fetching agencies:', error);
      }
    };

    fetchAgencyDetails();
  }, [id]);

  if (!agency) {
    return <div>Loading...</div>;
  }

  // Get the image file name from the agency data
  const imageName = agency.img;

  // Use the images object to get the image source
  const Agencyimage = images(`./${imageName}`);

  return (
    <div className='relative'>
      <section
        className='flex items-center justify-center mx-[100px] h-[500px]'
        style={{ zIndex: 1, overflow: 'hidden' }}
      >
        <img
          src={
            Agencyimage
              ? Agencyimage
              : 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80'
          }
          alt='Section Image'
          className='object-cover h-full border-white shadow-sm rounded-xl shadow-gray-900 w-[100px]'
          style={{ width: '100%' }}
        />
      </section>

      <div className='flex items-center justify-center h-screen bg-cover'>
        <Card
          className='w-full max-w-[900px] p-8 shadow-lg rounded-lg bg-green-500 text-black '
          style={{
            zIndex: 2,
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '90%',
          }}
        >
          <CardBody>
            <Typography
              color='white'
              size='lg'
              className='mb-4 text-4xl font-bold text-center'
            >
              {agency.agencyName}{' '}
              <Link to={`/uniqueagency/${agency._id}`}>
                <Button className='bg-blue-600 mx-[5px]'>Feedbacks</Button>
              </Link>
              {user && !user.isAdmin && (
                <div>
                  <Link to={`/addagencyfeedback/${agency._id}`}>
                    <Button className='bg-blue-600'>Give Feedback</Button>
                  </Link>
                </div>
              )}
            </Typography>
            <div className='grid grid-cols-2 gap-2'>
              <div>
                <label color='gray' className='mb-2 font-bold'>
                  Description
                </label>
                <Typography color='white' className='mb-2'>
                  {agency.description}
                </Typography>

                <label color='gray' className='mb-2 font-bold'>
                  Address
                </label>
                <Typography color='white'>{agency.address}</Typography>

                <label color='gray' className='mb-2 font-bold'>
                  Mobile
                </label>
                <Typography color='white'>{agency.mobile}</Typography>

                <label color='gray' className='mb-2 font-bold'>
                  Business Registration Number
                </label>
                <Typography color='white'>
                  {agency.businessRegistrationNumber}
                </Typography>
              </div>
              <div className='ml-10'>
                <label color='gray' className='mb-2 font-bold'>
                  Representer Mail
                </label>
                <Typography color='white'>{agency.representerMail}</Typography>

                <label color='gray' className='mb-2 font-bold'>
                  Business Mail
                </label>
                <Typography color='white'>{agency.businessMail}</Typography>

                <label color='gray' className='mb-2 font-bold'>
                  Fax
                </label>
                <Typography color='white'>{agency.fax}</Typography>

                <label color='gray' className='mb-2 font-bold'>
                  Tax ID Number
                </label>
                <Typography color='white'>{agency.taxIdNumber}</Typography>

                <label color='gray' className='mb-2 font-bold'>
                  Website Link
                </label>
                <Typography color='white'>{agency.websiteLink}</Typography>
              </div>
            </div>
            {(userInfo.isAdmin ||
              userInfo.email === agency.representerMail) && (
              <div className='flex justify-between mt-4'>
                <Link to={`/update/${agency._id}`}>
                  <Button color='blue' className='hover:bg-blue-500'>
                    Update Profile
                  </Button>
                </Link>

                <DeleteAgency id={agency._id} />
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default AgencyDetails;
