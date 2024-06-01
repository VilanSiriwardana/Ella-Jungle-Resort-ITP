import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useSelector } from 'react-redux';
import back from '../../assets/back.png';

function AgencyRegister() {
  const { userInfo } = useSelector(state => state.auth);
  const RepEmail = userInfo.email
  
  const [agencyName, setAgencyName] = useState('');
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const [businessRegistrationNumber, setBusinessRegistrationNumber] = useState('');
  const [representerMail, setRepresenterMail] = useState(RepEmail);
  const [businessMail, setBusinessMail] = useState('');
  const [fax, setFax] = useState('');
  const [taxIdNumber, setTaxIdNumber] = useState('');
  const [description, setDescription] = useState('');
  const [websiteLink, setWebsiteLink] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!agencyName) {
      toast.error("Agency Name is Required")
      return;
    }

    if (!/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(representerMail)) {
      toast.error('Please enter a valid Representer email address');
      return;
    }

    if (!/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(businessMail)) {
      toast.error('Please enter a valid Business email address');
      return;
    }

    if (!/^\d{10}$/.test(mobile)) {
      toast.error('Mobile number must be a valid 10-digit number');
      return;
    }

    const formData = new FormData();
    formData.append('agencyName', agencyName);
    formData.append('address', address);
    formData.append('mobile', mobile);
    formData.append('businessRegistrationNumber', businessRegistrationNumber);
    formData.append('representerMail', representerMail);
    formData.append('businessMail', businessMail);
    formData.append('fax', fax);
    formData.append('taxIdNumber', taxIdNumber);
    formData.append('description', description);
    formData.append('websiteLink', websiteLink);
    formData.append('img', imageFile);

    try {
      await axios.post('http://localhost:5000/api/agencies/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Form submitted successfully!');
      navigate('/agency');
    } catch (err) {
      console.error('Error submitting form:', err);
      alert('Error submitting form');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };


  return (
    <div
      className='flex items-center justify-center h-[1350px] mt-[-325px]'
      style={{ backgroundImage: `url(${back})`, backgroundSize: 'cover' }}
    >
    <div className='flex items-center justify-center h-screen '>
      <form
        onSubmit={handleSubmit}
        className='max-w-md px-8 py-6 bg-white rounded shadow-md'
      >
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <input
              className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
              type='text'
              placeholder='Agency Name'
              value={agencyName}
              onChange={e => setAgencyName(e.target.value)}
            />
          </div>
          <div>
            <input
              className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
              type='email'
              placeholder='Representer Mail'
              value={representerMail}
              onChange={e => setRepresenterMail(e.target.value)}
              readOnly
            />
          </div>
          <div>
            <input
              className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
              type='email'
              placeholder='Business Mail'
              value={businessMail}
              onChange={e => setBusinessMail(e.target.value)}
            />
          </div>
          <div>
            <input
              className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
              type='text'
              placeholder='Fax'
              value={fax}
              onChange={e => setFax(e.target.value)}
            />
          </div>

          <div>
            <input
              className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
              placeholder='Business Mobile'
              value={mobile}
              onChange={e => setMobile(e.target.value)}
            />
          </div>
          <div>
            <input
              className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
              type='text'
              placeholder='TAX ID'
              value={taxIdNumber}
              onChange={e => setTaxIdNumber(e.target.value)}
            />
          </div>

          <div>
            <input
              className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
              type='text'
              placeholder='Address'
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
          </div>

          <div>
            <input
              className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
              type='text'
              placeholder='Description'
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>

          <div>
            <input
              className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
              type='text'
              placeholder='Agency website'
              value={websiteLink}
              onChange={e => setWebsiteLink(e.target.value)}
            />
          </div>
          <div>
            <input
              className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
              type='text'
              placeholder='Business Reg.No'
              value={businessRegistrationNumber}
              onChange={e => setBusinessRegistrationNumber(e.target.value)}
            />
          </div>

          <div>
          <input
            className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
            type='file'
            onChange={handleImageChange}
          />
          <button type='button'>Select an Image</button>
        </div>
        </div>
        <button
          className='w-full px-4 py-2 mt-4 font-bold text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline'
          type='submit'
        >
          Register Agency
        </button>

      </form>
    </div>
    </div>
  );
}

export default AgencyRegister;
