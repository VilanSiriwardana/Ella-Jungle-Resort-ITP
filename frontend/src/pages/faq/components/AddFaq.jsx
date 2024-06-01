import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AddFaq = () => {
  const userInfo = useSelector(state => state.auth.userInfo);
  const [newFaqTitle, setNewFaqTitle] = useState('');
  const [newFaqDescription, setNewFaqDescription] = useState('');

  const handleAddFaq = async (e) => {
    e.preventDefault();

    if (userInfo === null) {
      alert("You must be logged in to submit feedback.");
      return;
    }

    if (!newFaqTitle.trim() || !newFaqDescription.trim()) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    const newFaq = {
      faqtitle: newFaqTitle,
      faqdescription: newFaqDescription,
      giverName: userInfo.name,
      giverId: userInfo._id // Include the giverId when creating a new FAQ
    };

    try {
      const response = await axios.post('/api/faq/addfaq', newFaq);
      console.log('FAQ added:', response.data);
      setNewFaqTitle('');
      setNewFaqDescription('');
      alert('FAQ added successfully!');
    } catch (error) {
      console.error('Error adding FAQ:', error);
      alert('Failed to add FAQ. Please try again.');
    }
  };

  return (
    <div className="container mx-auto relative">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl">Add New FAQ</h1>
      </div>
      <form onSubmit={handleAddFaq}>
        <div className="mb-8 p-10 shadow-md relative">
          <div className="mb-4">
            <label htmlFor="newFaqTitle" className="block text-xl font-bold">
              Title:
            </label>
            <input
              type="text"
              id="newFaqTitle"
              className="block w-full mt-1 p-2 border rounded-md"
              placeholder="Enter Title"
              value={newFaqTitle}
              onChange={(e) => setNewFaqTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="newFaqDescription" className="block text-xl font-bold">
              Description:
            </label>
            <textarea
              id="newFaqDescription"
              className="block w-full mt-1 p-2 border rounded-md"
              placeholder="Enter Description"
              value={newFaqDescription}
              onChange={(e) => setNewFaqDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="flex justify-end space-x-4">
            <Button type="submit" className="btn btn-primary bg-green-500">
              Add FAQ
            </Button>
            <Link to="/faq" className="no-underline">
              <Button className="btn btn-secondary bg-red-500">Cancel</Button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddFaq;
