import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

function UpdateAgency() {
  const { id } = useParams();
  const [agency, setAgency] = useState(null);

  const navigate = useNavigate();

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

  const [agencyName, setAgencyName] = useState('');
  const [address, setAddress] = useState('');
  const [img, setImg] = useState('');
  const [mobile, setMobile] = useState('');
  const [businessRegistrationNumber, setBusinessRegistrationNumber] =
    useState('');
  const [representerMail, setRepresenterMail] = useState('');
  const [businessMail, setBusinessMail] = useState('');
  const [fax, setFax] = useState('');
  const [taxIdNumber, setTaxIdNumber] = useState('');
  const [description, setDescription] = useState('');
  const [websiteLink, setWebsiteLink] = useState('');

  useEffect(() => {
    if (agency) {
      setAgencyName(agency.agencyName);
      setAddress(agency.address);
      setImg(agency.img);
      setMobile(agency.mobile);
      setBusinessRegistrationNumber(agency.businessRegistrationNumber);
      setRepresenterMail(agency.representerMail);
      setBusinessMail(agency.businessMail);
      setFax(agency.fax);
      setTaxIdNumber(agency.taxIdNumber);
      setDescription(agency.description);
      setWebsiteLink(agency.websiteLink);
    }
  }, [agency]);

  const handleSubmit = e => {
    e.preventDefault();

    const updatedAgency = {
      agencyName,
      address,
      img,
      mobile,
      businessRegistrationNumber,
      representerMail,
      businessMail,
      fax,
      taxIdNumber,
      description,
      websiteLink,
    };

    axios
      .put(`http://localhost:5000/api/agencies/update/${id}`, updatedAgency)
      .then(() => {
        toast.success('Form submitted successfully!');
        navigate(`/${id}`);
      })
      .catch(err => {
        console.error(err);
        toast.error('Error submitting form!');
      });
  };

  if (!agency) {
    return <div>Loading...</div>;
  }
  return (
    <div className='flex items-center justify-center h-screen mb-[10px] my-[50px]'>
      <form
        onSubmit={handleSubmit}
        className=' px-8 py-6 bg-green-300 rounded shadow-md mt-[-200px] w-[700px]'
      >
        <div className='text-4xl mx-[130px] my-5'>Update Agency Details</div>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label >Agency Name</label>
            <input
              className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
              type='text'
              placeholder='Agency Name'
              value={agencyName}
              onChange={e => setAgencyName(e.target.value)}
            />
          </div>
          <div>
          <label>Agent Name</label>
            <input
              className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
              type='email'
              placeholder='Representer Mail'
              value={representerMail}
              onChange={e => setRepresenterMail(e.target.value)}
            />
          </div>
          <div>
          <label>Agency Mail</label>
            <input
              className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
              type='email'
              placeholder='Business Mail'
              value={businessMail}
              onChange={e => setBusinessMail(e.target.value)}
            />
          </div>
          <div>
          <label>Fax</label>
            <input
              className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
              type='text'
              placeholder='Fax'
              value={fax}
              onChange={e => setFax(e.target.value)}
            />
          </div>

          <div>
          <label>Mobile</label>
            <input
              className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
              placeholder='Business Mobile'
              value={mobile}
              onChange={e => setMobile(e.target.value)}
            />
          </div>
          <div>
          <label>Tax ID</label>
            <input
              className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
              type='text'
              placeholder='TAX ID'
              value={taxIdNumber}
              onChange={e => setTaxIdNumber(e.target.value)}
            />
          </div>

          <div>
          <label>Address</label>
            <input
              className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
              type='text'
              placeholder='Address'
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
          </div>

          <div>
          <label>Description</label>
            <input
              className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
              type='text'
              placeholder='Description'
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>

          <div>
          <label>Website Link</label>
            <input
              className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
              type='text'
              placeholder='Agency website'
              value={websiteLink}
              onChange={e => setWebsiteLink(e.target.value)}
            />
          </div>
          <div>
          <label>Business Reg. No</label>
            <input
              className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
              type='text'
              placeholder='Business Reg.No'
              value={businessRegistrationNumber}
              onChange={e => setBusinessRegistrationNumber(e.target.value)}
            />
          </div>

          <div>
          <label hidden>Img</label>
            <input
              className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
              type='text'
              placeholder='image'
              value={img}
              onChange={e => setImg(e.target.value)}
              hidden
            />
          </div>
        </div>
        <button
          className='w-full px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline'
          type='submit'
          onSubmit={handleSubmit}
        >
          Update Agency Details
        </button>
      </form>
    </div>
  );
}

export default UpdateAgency;
