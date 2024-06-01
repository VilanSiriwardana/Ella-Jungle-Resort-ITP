import React, { useState } from "react";
import axios from "axios";
import { Button } from '@material-tailwind/react';
import { Link } from "react-router-dom";

const UpdateFaq = ({ faqId, currentTitle, currentDescription, onUpdateFaq }) => {
  const [faqTitle, setFaqTitle] = useState(currentTitle);
  const [faqDescription, setFaqDescription] = useState(currentDescription);

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Validation for empty fields
    if (!faqTitle.trim() || !faqDescription.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const updatedFaq = { faqtitle: faqTitle, faqdescription: faqDescription };
      await axios.put(`/api/faq/updatefaq/${faqId}`, updatedFaq);
      onUpdateFaq(); // Refresh or navigate as needed
      alert("FAQ updated successfully!");
    } catch (error) {
      console.error("Error updating FAQ.", error.message);
      alert("Error updating FAQ. Please try again.");
    }
  };

  return (
    <div className="container mx-auto relative">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl">Update Your FAQ</h1>
      </div>
      <form onSubmit={handleUpdate}>
        <div className="mb-8 p-10 shadow-md relative">
          <div className="mb-4">
            <label htmlFor="title" className="block text-xl font-bold">FAQ Title</label>
            <input
              type="text"
              id="title"
              className="block w-full mt-1 p-2 border rounded-md"
              placeholder="Enter Title"
              value={faqTitle}
              onChange={(e) => setFaqTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-xl font-bold">FAQ Description</label>
            <textarea
              id="description"
              className="block w-full mt-1 p-2 border rounded-md"
              placeholder="Enter Description"
              value={faqDescription}
              onChange={(e) => setFaqDescription(e.target.value)}
              rows="4"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <Button type="submit" className="btn btn-primary bg-green-500">Update</Button>
            <Link to="/Faq" className="no-underline">
              <Button className="btn btn-secondary bg-red-500">Cancel</Button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateFaq;
