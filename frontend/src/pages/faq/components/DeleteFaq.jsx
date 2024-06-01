import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@material-tailwind/react';

const DeleteFaq = ({ faqId }) => {
  const [deleted, setDeleted] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/faq/deletefaq/${faqId}`);
      console.log('FAQ deleted:', response.data);
      setDeleted(true);
      alert('FAQ deleted successfully!');
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      alert('Failed to delete FAQ. Please try again.');
    }
  };

  if (deleted) {
    return <p>FAQ deleted successfully!</p>;
  }

  return (
    <div>
      <Button className="btn btn-secondary bg-red-500" onClick={handleDelete}>Delete FAQ</Button>
    </div>
  );
};

export default DeleteFaq;
