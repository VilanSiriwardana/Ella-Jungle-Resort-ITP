import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
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
  const [spaPackages, setSpaPackages] = useState([]);
  const { userInfo } = useSelector(state => state.auth);
  const [filteredSpaPackages, setFilteredSpaPackages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [packageName, setPackageName] = useState('');

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


  const handleBookAppointment = () => {
    // Redirect to spaUser page
    window.location.href = '/spaUser';
  };

  return (
    <BackgroundContainer>
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          marginTop: '20px',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: '20px',
          }}
        >
          {userInfo && (
            <button
              onClick={handleBookAppointment}
              style={{
                backgroundColor: '#4CAF50',
                color: '#fff',
                padding: '10px 20px',
                borderRadius: '5px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Book Appointment
            </button>
          )}
        </div>

        <SearchBar
                  type="text"
                  placeholder="Search by Package Name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
              />

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            marginBottom: '20px',
          }}
        >
          {filteredSpaPackages.map(spaPackage => (
            <div
              key={spaPackage._id}
              style={{
                width: 'calc(50% - 20px)',
                maxWidth: '400px',
                backgroundColor: '#EDFCE3',
                padding: '15px',
                margin: '10px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                textAlign: 'left',
                position: 'relative',
              }}
            >
              <div
                style={{
                  backgroundColor: '#4CAF50',
                  color: '#fff',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  padding: '15px',
                  borderTopLeftRadius: '8px',
                  borderTopRightRadius: '8px',
                }}
              >
                {spaPackage.packageName}
              </div>
              <div
                style={{ padding: '15px', fontSize: '16px', lineHeight: '1.6' }}
              >
                <p>
                  <strong>Price:</strong> Rs. {spaPackage.price}
                </p>
                <p>
                  <strong>Description:</strong>
                </p>
                <div
                  style={{
                    maxHeight: '90px',
                    overflowY: 'auto',
                    fontSize: '16px',
                    lineHeight: '1.6',
                  }}
                >
                  {spaPackage.description}
                </div>
                <p>
                  <strong>Type:</strong> {spaPackage.type}
                </p>
                {/* Optional: Add edit and delete icons */}
                {/* <div style={{
                                    position: 'absolute',
                                    bottom: '10px',
                                    right: '10px'
                                }}>
                                    <FontAwesomeIcon
                                        icon={faEdit}
                                        style={{ cursor: 'pointer', marginRight: '10px' }}
                                        onClick={() => handleUpdatePackage(spaPackage)}
                                    />
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handleDeletePackage(spaPackage._id)}
                                    />
                                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </BackgroundContainer>
  );
};

export default Spa;
