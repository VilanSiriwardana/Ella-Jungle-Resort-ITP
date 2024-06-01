import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const HotelBookingForm = () => {
  const { id, price } = useParams();
  const { userInfo } = useSelector(state => state.auth);
  const userID = userInfo._id;

  const [formData, setFormData] = useState({
    user_id: userID,
    package_id: id,
    checkin_date: '',
    checkout_date: '',
    credit_card_no: '',
    name_on_card: '',
    exp_date: '',
    price: price,
    total_price: 0, // Initialize total_price to 0
  });

  const [openSuccess, setOpenSuccess] = useState(false);
  

 const handleChange = e => {
    if (e.target.name === 'credit_card_no') {
      const formattedValue = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
      setFormData({ ...formData, [e.target.name]: formattedValue });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    const calculateTotalPrice = () => {
      if (formData.checkin_date && formData.checkout_date) {
        const checkinDate = new Date(formData.checkin_date);
        const checkoutDate = new Date(formData.checkout_date);
        if (checkinDate > checkoutDate) {
          alert('Check-out date cannot be before Check-in date.');
          return;
        }
        const numberOfDays = Math.ceil(
          (checkoutDate - checkinDate) / (1000 * 60 * 60 * 24)
        );
        return Number(formData.price) * numberOfDays;
      }
      return 0;
    };

    const totalPrice = calculateTotalPrice();
    setFormData(prevFormData => ({
      ...prevFormData,
      total_price: totalPrice,
    }));
  }, [formData.checkin_date, formData.checkout_date, formData.price]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateCreditCard(formData.credit_card_no)) {
      alert('Credit Card Number must be in the format "0000 0000 0000 0000" and have exactly 16 digits.');
      return;
    }
    if (!validateNameOnCard(formData.name_on_card)) {
      alert('Name on Card can only use letters.');
      return;
    }
    try {
      const response = await axios.post(
        '/hotelbooking/add',
        {
          ...formData,
          price: formData.total_price,
        }
      );
      console.log(response.data);
      alert('Booking added successfully!');
      setOpenSuccess(true);
    } catch (error) {
      console.error(
        'Error adding booking:',
        error.response ? error.response.data : error.message
      );
      alert('An error occurred while adding the booking.');
    }
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };

  const generatePDF = () => {
    const input = document.getElementById('receipt-container');
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('booking_receipt.pdf');
    });
  };

  const handleGetReceipt = () => {
    generatePDF();
  };

  const validateCreditCard = cardNumber => {
    const regex = /^(\d{4} \d{4} \d{4} \d{4})$/;
    return regex.test(cardNumber);
  };

  const validateNameOnCard = name => {
    return /^[a-zA-Z\s]+$/.test(name);
  };

  return (
    <div className='max-w-md mx-auto'>
      <div className="flex justify-end mb-4">
        <Link to='/cusbokingdisplay'>
          <Button variant="outlined" color="primary" onClick={() => console.log("View My Bookings clicked")}>
            View My Bookings
          </Button>
        </Link>
      </div>
      <h1 className='mb-4 text-2xl font-bold'>Custom Packages Booking Form</h1>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label htmlFor='checkin_date' className='block'>
            Check-in Date:
          </label>
          <input
            type='date'
            id='checkin_date'
            name='checkin_date'
            value={formData.checkin_date}
            onChange={handleChange}
            className={`border p-2 w-full ${
              formData.checkin_date ? 'border-green-500' : 'border-red-500'
            }`}
            required
          />
        </div>
        <div>
          <label htmlFor='checkout_date' className='block'>
            Check-out Date:
          </label>
          <input
            type='date'
            id='checkout_date'
            name='checkout_date'
            value={formData.checkout_date}
            onChange={handleChange}
            className={`border p-2 w-full ${
              formData.checkout_date ? 'border-green-500' : 'border-red-500'
            }`}
            required
          />
        </div>
        <div>
          <label htmlFor='credit_card_no' className='block'>
            Credit Card Number:
          </label>
          <input
            type='text'
            id='credit_card_no'
            name='credit_card_no'
            value={formData.credit_card_no}
            onChange={handleChange}
            className={`border p-2 w-full ${
              formData.credit_card_no ? 'border-green-500' : 'border-red-500'
            }`}
            required
          />
        </div>
        <div>
          <label htmlFor='name_on_card' className='block'>
            Name on Card:
          </label>
          <input
            type='text'
            id='name_on_card'
            name='name_on_card'
            value={formData.name_on_card}
            onChange={handleChange}
            className={`border p-2 w-full ${
              formData.name_on_card ? 'border-green-500' : 'border-red-500'
            }`}
            required
          />
        </div>
        <div>
          <label htmlFor='total_price' className='block'>
            Total Price:
          </label>
          <input
            type='text'
            id='total_price'
            name='total_price'
            value={formData.total_price}
            readOnly
            className='w-full p-2 border'
          />
        </div>
        <div>
          <label htmlFor='exp_date' className='block'>
            Credit Card - Expiry Date:
          </label>
          <input
            type='date'
            id='exp_date'
            name='exp_date'
            value={formData.exp_date}
            onChange={handleChange}
            className={`border p-2 w-full ${
              formData.exp_date ? 'border-green-500' : 'border-red-500'
            }`}
            required
          />
        </div>
        <button
          type='submit'
          className='px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600'
        >
          Submit
        </button>
      </form>
      <Dialog open={openSuccess} onClose={handleCloseSuccess}>
        <DialogTitle>Your Booking is successfully done!</DialogTitle>
        <DialogContent id='receipt-container'>
          <p>Your booking details are as follows:</p>
          <p>User ID: {formData.user_id}</p>
          <p>Package ID: {formData.package_id}</p>
          <p>Check-in Date: {formData.checkin_date}</p>
          <p>Check-out Date: {formData.checkout_date}</p>
          <p>Credit Card Number: {formData.credit_card_no}</p>
          <p>Name on Card: {formData.name_on_card}</p>
          <p>Total Price: {formData.total_price}</p>
          <p>Expiry Date: {formData.exp_date}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSuccess}>OK</Button>
          <Button onClick={handleGetReceipt}>Download PDF Receipt</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HotelBookingForm;