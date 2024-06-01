import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CustomPackageList() {
  const [customPackages, setCustomPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomPackages = async () => {
      try {
        // Fetch custom packages from the backend API
        const response = await axios.get('/custom_packages/');
        setCustomPackages(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCustomPackages();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Custom Packages</h1>
      <ul>
        {customPackages.map((customPackage) => (
          <li key={customPackage._id}>
            User ID: {customPackage.user_id}<br />
            Total Price: Rs.{customPackage.total_price}<br />
            Packages:
            <ul>
              {customPackage.custom_package_id.map((packageId) => (
                <li key={packageId}>{packageId}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
