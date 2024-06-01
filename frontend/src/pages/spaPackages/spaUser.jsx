import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import backgroundImage from '../../assets/health/ActivityBackground.jpg';


const BackgroundContainer = styled.div`
    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
`;



const AppointmentContainer = styled.div`
    text-align: center;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 80%;
    max-width: 500px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #EDFCE3;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 2px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(5px);
`;

const FormGroup = styled.div`
    width: 100%;
    margin-bottom: 20px;
`;

const Label = styled.label`
    font-size: 1rem;
    color: #333;
    margin-bottom: 8px;
    text-align: left;
`;

const Input = styled.input`
    width: 100%;
    padding: 12px;
    font-size: 0.9rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    transition: border-color 0.3s ease;

    &:focus {
        border-color: #007bff;
    }
`;

const Select = styled.select`
    width: 100%;
    padding: 12px;
    font-size: 0.9rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    transition: border-color 0.3s ease;

    &:focus {
        border-color: #007bff;
    }
`;

const SubmitButton = styled.button`
    width: 100%;
    padding: 12px;
    background-color: #228B22;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #1A7F1A;
    }
`;

const MyAppointmentsButton = styled.button`
    background-color: #4CAF50;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    box-shadow: 0 0 10px #0B0C0B;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #038576;
    }
`;

const Appointment = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        address: '',
        contactNumber: '',
        NIC: '',
        appointmentType: '',
        appointmentDate: null,
        hours: '1',
    });

    const [spaPackages, setSpaPackages] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        fetchSpaPackages();
    }, []);

    const fetchSpaPackages = async () => {
        try {
            const response = await axios.get('/api/spa-packages');
            setSpaPackages(response.data);
        } catch (error) {
            console.error('Error fetching spa packages:', error);
        }
    };

    useEffect(() => {
        calculateTotalPrice();
    }, [formData.appointmentType, formData.hours]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleDateChange = (date) => {
        setFormData({
            ...formData,
            appointmentDate: date,
        });
    };

    const handleHoursChange = (e) => {
        const hours = e.target.value;
        setFormData({
            ...formData,
            hours,
        });
    };

    const calculateTotalPrice = () => {
        const selectedPackage = spaPackages.find((pkg) => pkg.packageName === formData.appointmentType);
        if (selectedPackage) {
            const packagePrice = selectedPackage.price;
            const hours = parseInt(formData.hours);
            const serviceCharge = 0.1; // 10% service charge
            const totalPrice = packagePrice * hours * (1 + serviceCharge);
            setTotalPrice(totalPrice);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.firstName ||
            !formData.address ||
            !formData.contactNumber ||
            !formData.NIC ||
            !formData.appointmentDate ||
            !formData.appointmentType
        ) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill out all required fields.',
            });
            return;
        }

        // Validate contact number
        const contactNumberPattern = /^[0-9]{10}$/;
        if (!contactNumberPattern.test(formData.contactNumber)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter a valid contact number with 10 digits!',
            });
            return;
        }

        // Validate NIC
        const NICPattern = /^([0-9]{12}|[0-9]{12}[Vv])$/;


        if (!NICPattern.test(formData.NIC)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter a valid NIC with only letters and numbers!',
            });
            return;
        }

        try {
            calculateTotalPrice();

            const dataToSend = {
                ...formData,
                totalPrice: totalPrice.toFixed(2),
            };

            const response = await axios.post('/api/appointments', dataToSend);

            setFormData({
                firstName: '',
                lastName: '',
                address: '',
                contactNumber: '',
                NIC: '',
                appointmentType: '',
                appointmentDate: null,
                hours: '1',
            });
            setTotalPrice(0);

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Appointment booked successfully!',
            });

            console.log(response.data);
        } catch (error) {
            console.error('Error booking appointment:', error);

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong! Please try again later.',
            });
        }
    };

    const myAppointments = () => {
        window.location.href = '/appointmentView';
    };

    return (
        <BackgroundContainer>
            <AppointmentContainer>
                <MyAppointmentsButton onClick={myAppointments}>My Appointments</MyAppointmentsButton>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '20px', color: '#333' }}>Book an Appointment</h2>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="firstName">First Name:</Label>
                        <Input type="text" id="firstName" name="firstName" placeholder="Enter your first name" value={formData.firstName} onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="address">Address:</Label>
                        <Input type="text" id="address" name="address" placeholder="Enter your address" value={formData.address} onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="contactNumber">Contact Number:</Label>
                        <Input type="text" id="contactNumber" name="contactNumber" placeholder="Enter your contact number" value={formData.contactNumber} onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="NIC">NIC:</Label>
                        <Input type="text" id="NIC" name="NIC" placeholder="Enter your NIC" value={formData.NIC} onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="appointmentDate">Appointment Date:</Label>
                        <DatePicker
                            id="appointmentDate"
                            selected={formData.appointmentDate}
                            onChange={handleDateChange}
                            minDate={new Date()}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="MMMM d, yyyy h:mm aa"
                            placeholderText="Select appointment date and time"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="appointmentType">Package :</Label>
                        <Select id="appointmentType" name="appointmentType" value={formData.appointmentType} onChange={handleChange}>
                            <option value="">Select Appointment Type</option>
                            {spaPackages.map((spaPackage) => (
                                <option key={spaPackage._id} value={spaPackage.packageName}>
                                    {spaPackage.packageName}
                                </option>
                            ))}
                        </Select>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="hours">Hours:</Label>
                        <Select id="hours" name="hours" value={formData.hours} onChange={handleHoursChange}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </Select>
                    </FormGroup>
                    <FormGroup>
                        <Label>Total Price (Rs):</Label>
                        <Input type="text" value={`Rs. ${totalPrice.toFixed(2)} ( service charge 10% )`} readOnly />
                    </FormGroup>
                    <SubmitButton type="submit">Book Appointment</SubmitButton>
                </Form>
            </AppointmentContainer>
        </BackgroundContainer>
    );
};

export default Appointment;
