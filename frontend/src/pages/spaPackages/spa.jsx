import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import backgroundImage from '../../assets/health/ActivityBackground.jpg';

const BackgroundContainer = styled.div`
    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center;
    min-height: 100vh;
`;

const SearchBar = styled.input`
    padding: 10px;
    width: 30%;
    border: 1px solid #004200;
    border-radius: 40px;
    margin-bottom: 10px;
`;

const Spa = () => {
    const [showModal, setShowModal] = useState(false);
    const [updatePackage, setUpdatePackage] = useState(null);
    const [packageName, setPackageName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [spaPackages, setSpaPackages] = useState([]);
    const [filteredSpaPackages, setFilteredSpaPackages] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const [validationErrors, setValidationErrors] = useState({
        packageName: '',
        price: '',
        description: '',
        type: ''
    });

    useEffect(() => {
        fetchSpaPackages();
    }, []);

    const fetchSpaPackages = async () => {
        try {
            const response = await axios.get('/api/spa-packages');
            setSpaPackages(response.data);

            // Initially set filtered packages to all packages
            setFilteredSpaPackages(response.data);
        } catch (error) {
            console.error('Error fetching spa packages:', error);
        }
    };

    useEffect(() => {
        setFilteredSpaPackages(spaPackages.filter(spaPackages =>
            spaPackages.packageName.toLowerCase().includes(searchQuery.toLowerCase())
        ));
    }, [searchQuery, spaPackages]);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const errors = {};
        if (!packageName.trim()) {
            errors.packageName = 'Package Name is required.';
        }
        if (!isValidPrice(price)) {
            errors.price = 'Please enter a valid price greater than 0.';
        }
        if (!description.trim()) {
            errors.description = 'Description is required.';
        }
        if (!type.trim()) {
            errors.type = 'Type is required.';
        }

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        try {
            let response;
            if (updatePackage) {
                response = await axios.put(`/api/spa-packages/${updatePackage._id}`, {
                    packageName,
                    price: parseFloat(price),
                    description,
                    type
                });
            } else {
                response = await axios.post('/api/spa-packages', {
                    packageName,
                    price: parseFloat(price),
                    description,
                    type
                });
            }

            setPackageName('');
            setPrice('');
            setDescription('');
            setType('');
            setUpdatePackage(null);
            setShowModal(false);

            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: updatePackage ? 'Package updated successfully.' : 'New spa package created successfully.'
            });

            fetchSpaPackages();
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: updatePackage ? 'Failed to update package. Please try again.' : 'Failed to create spa package. Please try again.'
            });
        }
    };

    const isValidPrice = (value) => {
        const parsedPrice = parseFloat(value);
        return !isNaN(parsedPrice) && parsedPrice > 0;
    };

    const handleAddNewPackage = () => {
    
        setUpdatePackage(null);
        setPackageName('');
        setPrice('');
        setDescription('');
        setType('');
    
        setValidationErrors({
            packageName: '',
            price: '',
            description: '',
            type: ''
        });
    
        setShowModal(true);
    };

    const handleDeletePackage = async (id) => {
        const confirmResult = await Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: 'This action cannot be undone.',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        });

        if (confirmResult.isConfirmed) {
            try {
                await axios.delete(`/api/spa-packages/${id}`);

                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: 'The spa package has been deleted.'
                });

                fetchSpaPackages();
            } catch (error) {
                console.error('Error deleting spa package:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to delete spa package. Please try again.'
                });
            }
        }
    };

    const handleUpdatePackage = (spaPackage) => {
       
        setUpdatePackage(spaPackage);
        setPackageName(spaPackage.packageName);
        setPrice(spaPackage.price.toString());
        setDescription(spaPackage.description);
        setType(spaPackage.type);
    

        setValidationErrors({
            packageName: '',
            price: '',
            description: '',
            type: ''
        });

        setShowModal(true);
    };

    return (
        <BackgroundContainer>
            <div style={{ maxWidth: '800px', margin: '0 auto', marginTop: '20px', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                    <button
                        onClick={handleAddNewPackage}
                        style={{
                            backgroundColor: '#4CAF50',
                            color: '#fff',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        Add New Package
                    </button>
                </div>

                <SearchBar
                    type="text"
                    placeholder="Search by Package Name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                
                {showModal && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 9999 
                    }}>
                        <div style={{
                            backgroundColor: '#fff',
                            width: '80%',
                            maxWidth: '500px',
                            padding: '20px',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                        }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '20px'
                            }}>
                                <h2>{updatePackage ? 'Update Package' : 'Add New Package'}</h2>
                                <button onClick={() => setShowModal(false)} style={{
                                    backgroundColor: 'transparent',
                                    color: '#333',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '24px'
                                }}>
                                    X
                                </button>
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <form onSubmit={handleFormSubmit}>
                                    <div style={{ marginBottom: '20px' }}>
                                        <label>Package Name:</label>
                                        <input
                                            type="text"
                                            value={packageName}
                                            onChange={(e) => setPackageName(e.target.value)}
                                            style={{
                                                width: '100%',
                                                padding: '10px',
                                                borderRadius: '5px',
                                                border: '1px solid #ccc'
                                            }}
                                        />
                                        {validationErrors.packageName && (
                                            <p style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{validationErrors.packageName}</p>
                                        )}
                                    </div>
                                    <div style={{ marginBottom: '20px' }}>
                                        <label>Price:</label>
                                        <input
                                            type="text"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            style={{
                                                width: '100%',
                                                padding: '10px',
                                                borderRadius: '5px',
                                                border: '1px solid #ccc'
                                            }}
                                        />
                                        {validationErrors.price && (
                                            <p style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{validationErrors.price}</p>
                                        )}
                                    </div>
                                    <div style={{ marginBottom: '20px' }}>
                                        <label>Description:</label>
                                        <textarea
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            style={{
                                                width: '100%',
                                                padding: '10px',
                                                borderRadius: '5px',
                                                border: '1px solid #ccc',
                                                height: '80px'
                                            }}
                                            rows={5}
                                        />
                                        {validationErrors.description && (
                                            <p style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{validationErrors.description}</p>
                                        )}
                                    </div>
                                    <div style={{ marginBottom: '20px' }}>
                                        <label>Type:</label>
                                        <select
                                            value={type}
                                            onChange={(e) => setType(e.target.value)}
                                            style={{
                                                width: '100%',
                                                padding: '10px',
                                                borderRadius: '5px',
                                                border: '1px solid #ccc'
                                            }}
                                        >
                                            <option value="">Select Type</option>
                                            <option value="Premium">Premium</option>
                                            <option value="Standard">Standard</option>
                                            <option value="Basic">Basic</option>
                                            <option value="Deluxe">Deluxe</option>
                                            <option value="Custom">Custom</option>
                                        </select>
                                        {validationErrors.type && (
                                            <p style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{validationErrors.type}</p>
                                        )}
                                    </div>
                                    <button type="submit" style={{
                                        backgroundColor: '#04c2a5',
                                        color: '#fff',
                                        padding: '10px 20px',
                                        borderRadius: '5px',
                                        border: 'none',
                                        cursor: 'pointer'
                                    }}>
                                        {updatePackage ? 'Update' : 'Submit'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', marginBottom: '20px' }}>
                    {filteredSpaPackages.map((spaPackage) => (
                        <div key={spaPackage._id} style={{
                            width: 'calc(50% - 20px)',
                            maxWidth: '400px',
                            backgroundColor: '#EDFCE3',
                            padding: '15px',
                            margin: '10px',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            textAlign: 'left',
                            position: 'relative'
                        }}>
                            <div style={{
                                backgroundColor: '#4CAF50',
                                color: '#fff',
                                fontSize: '20px',
                                fontWeight: 'bold',
                                padding: '15px',
                                borderTopLeftRadius: '8px',
                                borderTopRightRadius: '8px'
                            }}>
                                {spaPackage.packageName}
                            </div>
                            <div style={{ padding: '15px', fontSize: '16px', lineHeight: '1.6' }}>
                                <p><strong>Price:</strong> Rs. {spaPackage.price}</p>
                                <p><strong>Description:</strong></p>
                                <div style={{
                                    maxHeight: '90px',
                                    overflowY: 'auto',
                                    fontSize: '16px',
                                    lineHeight: '1.6'
                                }}>
                                    {spaPackage.description}
                                </div>
                                <p><strong>Type:</strong> {spaPackage.type}</p>
                                <div style={{
                                    position: 'absolute',
                                    bottom: '10px',
                                    right: '10px'
                                }}>
                                    <FontAwesomeIcon
                                        icon={faEdit}
                                        style={{
                                            color: '#999999',
                                            cursor: 'pointer',
                                            fontSize: '20px',
                                            marginRight: '10px'
                                        }}
                                        onClick={() => handleUpdatePackage(spaPackage)}
                                    />
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        style={{
                                            color: '#999999',
                                            cursor: 'pointer',
                                            fontSize: '20px'
                                        }}
                                        onClick={() => handleDeletePackage(spaPackage._id)}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </BackgroundContainer>
    );
};

export default Spa;
