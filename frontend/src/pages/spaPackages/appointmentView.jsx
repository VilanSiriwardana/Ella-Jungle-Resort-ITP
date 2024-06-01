import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import swal from 'sweetalert';
import backgroundImage from '../../assets/health/ActivityBackground.jpg';
import pdfIcon from '../../assets/health/pdf.jpg';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const BackgroundContainer = styled.div`
    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center;
    min-height: 100vh;
`;

const PageContainer = styled.div`
    text-align: center;
`;

const BoxContainer = styled.div`
    max-width: 90%;
    margin: 20px auto;
    padding: 20px;
    background-color: rgba(99, 255, 71, 0.2);
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(10px);
`;

const PdfIcon = styled.img`
    position: absolute;
    top: 10%;
    right: 15%;
    width: 60px;
    height: 60px;
    cursor: pointer;
`;

const AppointmentsContainer = styled.div`
    text-align: center;
    padding: 20px;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const TableHead = styled.thead`
    background-color: #DAFCD4;
`;

const TableHeader = styled.th`
    padding: 10px;
    border: 1px solid #696969;
`;

const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: #DAFCD4;
    }
`;

const TableCell = styled.td`
    padding: 10px;
    background-color: #DAFCD4;
    border: 1px solid #696969;
`;

const ActionButton = styled.button`
    background-color: ${(props) => props.bgColor};
    color: white;
    border: none;
    border-radius: 5px;
    padding: 8px 15px;
    cursor: pointer;
    margin-right: 5px;
`;

const SearchBar = styled.input`
    padding: 10px;
    width: 30%;
    border: 1px solid #004200;
    border-radius: 40px;
    margin-bottom: 10px;
`;

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get('/api/appointments');
                setAppointments(response.data);
            } catch (error) {
                console.error('Error fetching appointments:', error);
                // Handle error gracefully
            }
        };

        fetchAppointments();
    }, []);

    useEffect(() => {
        setFilteredAppointments(appointments.filter(appointment =>
            appointment.NIC.toLowerCase().includes(searchQuery.toLowerCase())
        ));
    }, [searchQuery, appointments]);

    const handleDeleteClick = async (appointmentId) => {
        try {
            await axios.delete(`/api/appointments/${appointmentId}`);
            setAppointments(appointments.filter(appointment => appointment._id !== appointmentId));
            swal('Success', 'Appointment deleted successfully', 'success');
        } catch (error) {
            console.error('Error deleting appointment:', error);
            swal('Error', 'Failed to delete appointment', 'error');
        }
    };

    const handleDownloadPdf = () => {
        const doc = new jsPDF();
        const tableColumn = ["NIC", "Name", "Address", "Contact Number", "Appointment Date", "Appointment Type", "Total Price"];
        const tableRows = filteredAppointments.map(appointment => [
            appointment.NIC,
            `${appointment.firstName} `,
            appointment.address,
            appointment.contactNumber,
            new Date(appointment.appointmentDate).toLocaleString(),
            appointment.appointmentType,
            `$${appointment.totalPrice}`
        ]);

        doc.autoTable({ head: [tableColumn], body: tableRows });
        doc.save('appointments.pdf');
    };

    const handleEditClick = (appointmentId) => {
        // Your edit logic goes here
        console.log('Edit clicked for appointment ID:', appointmentId);
    };

    return (
        <BackgroundContainer>
            <PageContainer>
                <BoxContainer>
                    <PdfIcon src={pdfIcon} alt="PDF Icon" onClick={handleDownloadPdf} />
                    <h2 style={{ fontSize: '24px' }}>APPOINTMENTS</h2>
                    <SearchBar
                        type="text"
                        placeholder="Search by NIC"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <AppointmentsContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableHeader>NIC</TableHeader>
                                    <TableHeader>Name</TableHeader>
                                    <TableHeader>Address</TableHeader>
                                    <TableHeader>Contact Number</TableHeader>
                                    <TableHeader>Appointment Date</TableHeader>
                                    <TableHeader>Appointment Type</TableHeader>
                                    <TableHeader>Total Price</TableHeader>
                                    <TableHeader>Actions</TableHeader>
                                </TableRow>
                            </TableHead>
                            <tbody>
                                {filteredAppointments.map((appointment) => (
                                    <TableRow key={appointment._id}>
                                        <TableCell>{appointment.NIC}</TableCell>
                                        <TableCell>{`${appointment.firstName}`}</TableCell>
                                        <TableCell>{appointment.address}</TableCell>
                                        <TableCell>{appointment.contactNumber}</TableCell>
                                        <TableCell>{new Date(appointment.appointmentDate).toLocaleString()}</TableCell>
                                        <TableCell>{appointment.appointmentType}</TableCell>
                                        <TableCell>Rs.{appointment.totalPrice}</TableCell>
                                        <TableCell>
                                            
                                            <ActionButton bgColor="#737272" onClick={() => handleDeleteClick(appointment._id)}>Delete</ActionButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </tbody>
                        </Table>
                    </AppointmentsContainer>
                </BoxContainer>
            </PageContainer>
        </BackgroundContainer>
    );
};

export default Appointments;
