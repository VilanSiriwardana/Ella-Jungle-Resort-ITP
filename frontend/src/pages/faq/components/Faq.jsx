import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from '@material-tailwind/react';
import { useSelector } from 'react-redux';
import UpdateFaq from "./UpdateFaq"; // Ensure you have this component created
import { Link } from "react-router-dom";

const Faq = () => {
  const [faqs, setFaqs] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState({});
  const userInfo = useSelector(state => state.auth.userInfo);

  useEffect(() => {
    const giverId = userInfo ? userInfo._id : null;
    if (giverId) {
      fetchFaqs(giverId);
    }
  }, [userInfo]);

  const fetchFaqs = async (giverId) => {
    try {
      const response = await axios.get(`/api/faq/bygiver/${giverId}`);
      setFaqs(response.data);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    }
  };

  const handleDelete = async (faqId) => {
    try {
      await axios.delete(`/api/faq/deletefaq/${faqId}`);
      setFaqs(faqs.filter(faq => faq._id !== faqId));
      alert('FAQ deleted successfully!');
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      alert('Failed to delete FAQ. Please try again.');
    }
  };

  const toggleUpdateForm = (faqId) => {
    setShowUpdateForm(prevState => ({
      ...prevState,
      [faqId]: !prevState[faqId]
    }));
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto relative">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl">My FAQs</h1>
        <div className="flex space-x-2">
          <Link to="/addfaq" className="no-underline">
            <Button className="btn btn-primary bg-green-500">Add FAQ</Button>
          </Link>
        </div>
      </div>
      {faqs.length > 0 ? (
        <ul className="list-none p-0">
          {faqs.map((faq) => (
            <li key={faq._id} className="mb-8 p-10 shadow-md relative">
              <p>{faq.giverName}</p>
              <p className="text-sm text-gray-500">{formatDate(faq.createdAt)}</p><br />
              <h3 className="mb-4 font-bold text-2xl">{faq.faqtitle}</h3>
              <p>{faq.faqdescription}
              {faq.replies.length > 0 && (
                <div className="mt-4">
                  {faq.replies.map((reply, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-100 p-3 rounded-md">
                      <div>
                        <span className="font-bold text-gray-800">Admin:</span> {reply}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              
              
              </p><br/><br/><br/>
              <div className="flex justify-end space-x-2">
                {showUpdateForm[faq._id] ? (
                  <UpdateFaq
                    faqId={faq._id}
                    currentTitle={faq.faqtitle}
                    currentDescription={faq.faqdescription}
                    onUpdateFaq={() => {
                      fetchFaqs(userInfo._id); // Adjust based on your state management
                      toggleUpdateForm(faq._id); // Close the form after updating
                    }}
                  />
                ) : (
                  <>
                    <Button
                      className="bg-green-500"
                      onClick={() => toggleUpdateForm(faq._id)}
                    >
                      Update
                    </Button>
                    <Button
                      className="bg-red-500"
                      onClick={() => handleDelete(faq._id)}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center">
          <p className="text-xl">You Have no FAQs to display.</p><br />
        </div>
      )}
    </div>
  );
};

export default Faq;
