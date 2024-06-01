import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

export function UserUpdate() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/specific/${id}`
        );
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUserDetails();
  }, [id]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [mobile, setMobile] = useState('');
  const [img, setImg] = useState('');
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setUserType(user.userType);
      setMobile(user.mobile);
      setImg(user.img);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const handleSubmit = e => {
    e.preventDefault();

    if (!/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (!(userType === 'Guest' || userType === 'Travel Agent')) {
      toast.error('User Type should be Guest or Travel Agent');
      return
    }

    if (!/^\d{10}$/.test(mobile)) {
      toast.error('Mobile number must be a valid 10-digit number');
      return;
    }

    const updatedUser = {
      name,
      email,
      password,
      userType,
      mobile,
      img,
      isAdmin,
    };

    axios
      .put(`http://localhost:5000/api/users/specific/${id}`, updatedUser)
      .then(() => {
        toast.success('User details updated successfully!');
        navigate(`/all`);
      })
      .catch(err => {
        console.error(err);
        toast.error('Error updating user details!');
      });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-center bg-cover'>
      
      <form
        onSubmit={handleSubmit}
        className='max-w-md px-8 py-6 text-gray-800 bg-green-100 rounded shadow-md'
        style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
      >
        <label htmlFor='profile' className='cursor-pointer'>
        <img
          src={img || 'https://docs.material-tailwind.com/img/face-2.jpg'}
          alt='avatar'
          className='object-cover w-32 h-32 mx-auto border-4 border-white rounded-full shadow-md'
        />
      </label>
        <label>Name</label>
        <input
          type='text'
          placeholder='Name'
          value={name}
          onChange={e => setName(e.target.value)}
          className='w-full px-4 py-2 my-2 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
        />
        <label>Email</label>
        <input
          placeholder='Email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          className='w-full px-4 py-2 my-2 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
        />
        <label>User Type</label>
        <input
          type='text'
          placeholder='User Type'
          value={userType}
          onChange={e => setUserType(e.target.value)}
          className='w-full px-4 py-2 my-2 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
        />
        <label>Is Admin ?</label>
        <select
          value={isAdmin}
          onChange={e => setIsAdmin(e.target.value === 'true')}
          className='w-full px-4 py-2 my-2 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
        >
          <option value='true'>True</option>
          <option value='false'>False</option>
        </select>
        <label>Mobile</label>
        <input
          type='text'
          placeholder='Mobile'
          value={mobile}
          onChange={e => setMobile(e.target.value)}
          className='w-full px-4 py-2 my-2 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
        />
        <button
          type='submit'
          className='w-full px-4 py-2 my-4 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline'
        >
          Update User
        </button>
      </form>
    </div>
  );
}