import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useUpdateUserMutation, useDeleteUserMutation } from "../../slices/usersApiSlice";
import { setCredentials, logout } from "../../slices/authSlice";
import convertToBase64 from "../../helper/convert";
import avatar from "../../assets/profile.png";
import { useNavigate } from "react-router-dom";
import AgencySentRequestList from "../travelAgency/client/agencySentRequestList";
import AgencyBgImg from "../../assets/agencyBackground/agencybg5.png";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [userType, setUserType] = useState("");
  const [img, setImg] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);

  const onUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setImg(base64);
    }
  };

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setMobile(userInfo.mobile);
      setUserType(userInfo.userType);
      setIsAdmin(userInfo.isAdmin);
      setImg(userInfo.img || avatar);
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Name is required for the profile");
      return;
    }

    if (!/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!/^\d{10}$/.test(mobile)) {
      toast.error("Mobile number must be a valid 10-digit number");
      return;
    }

    if (userType === "") {
      toast.error("Please select a user type");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const updatedInfo = {
          _id: userInfo._id,
          name,
          email,
          mobile,
          userType,
          img,
          isAdmin,
        };
        if (password) {
          updatedInfo.password = password;
        }
        const res = await updateProfile(updatedInfo).unwrap();
        dispatch(setCredentials(res));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err?.error || "Failed to update profile");
      }
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser(userInfo._id).unwrap();
      await dispatch(logout());
      toast.success("Account deleted successfully");
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err?.error || "Failed to delete account");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url("${AgencyBgImg}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <div className='max-w-md p-8 mx-auto mt-10 bg-green-300 rounded-lg shadow-md mb-[20px]'>
        <h1 className='mb-4 text-2xl font-bold text-center'>Update Profile</h1>

        <form onSubmit={submitHandler} className='space-y-4'>
          <div className='flex justify-center py-4'>
            <label htmlFor='profile' className='cursor-pointer'>
              <img src={img} alt='avatar' className='object-cover w-32 h-32 rounded-full' />
            </label>
            <input onChange={onUpload} type='file' id='profile' name='profile' className='hidden' />
          </div>

          <div className='flex flex-col space-y-2'>
            <label htmlFor='name' className='text-sm font-semibold'>
              Name:
            </label>
            <input
              type='text'
              id='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='px-4 py-2 border rounded-lg'
            />
          </div>

          <div className='flex flex-col space-y-2'>
            <label htmlFor='email' className='text-sm font-semibold'>
              Email Address:
            </label>
            <input
              id='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='px-4 py-2 border rounded-lg'
            />
          </div>

          <div className='flex flex-col space-y-2'>
            <label htmlFor='mobile' className='text-sm font-semibold'>
              Mobile Number:
            </label>
            <input
              type='text'
              id='mobile'
              placeholder='Enter mobile number'
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className='px-4 py-2 border rounded-lg'
            />
          </div>

          <div className='flex flex-col space-y-2'>
            <label htmlFor='userType' className='text-sm font-semibold'>
              User Type:
            </label>
            <select
              id='userType'
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className='px-4 py-2 border rounded-lg'
            >
              <option value='Guest'>Guest</option>
              <option value='Travel Agent'>Travel Agent</option>
            </select>
          </div>

          <div className='flex flex-col space-y-2'>
            <label htmlFor='password' className='text-sm font-semibold'>
              Password:
            </label>
            <input
              type='password'
              id='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='px-4 py-2 border rounded-lg'
            />
          </div>

          <div className='flex flex-col space-y-2'>
            <label htmlFor='confirmPassword' className='text-sm font-semibold'>
              Confirm Password:
            </label>
            <input
              type='password'
              id='confirmPassword'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='px-4 py-2 border rounded-lg'
            />
          </div>

          <button
            type='submit'
            className='w-full py-2 text-white transition duration-300 bg-blue-500 rounded-lg hover:bg-blue-600'
          >
            Update
          </button>
          <button
            type='button'
            onClick={handleDelete}
            className='w-full py-2 text-white transition duration-300 bg-red-500 rounded-lg hover:bg-red-600'
          >
            Delete Account
          </button>
        </form>
      </div>
      <div>{userInfo.userType === "Guest" && <AgencySentRequestList />}</div>
    </div>
  );
};

export default Profile;
