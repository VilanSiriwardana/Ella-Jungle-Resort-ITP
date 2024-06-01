import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from '@material-tailwind/react';
import { Button } from '@material-tailwind/react';
import { Link } from "react-router-dom";

function Icon({ id, open }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={2}
      stroke='currentColor'
      className={`${id === open ? 'rotate-180' : ''} h-5 w-5 transition-transform`}>
      <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
    </svg>
  );
}

export function FAQsection() {
  const [faqs, setFaqs] = useState([]);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    // Fetch the lastly created 4 FAQs
    const fetchFaqs = async () => {
      try {
        const { data } = await axios.get('/api/faq/recent'); // Make sure this endpoint exists and is correct
        setFaqs(data);
      } catch (error) {
        console.error('Error fetching recent FAQs:', error);
      }
    };

    fetchFaqs();
  }, []);

  return (
    <div className='my-20 max-w-[800px] mx-auto'>
      <h1 className='pb-1 mb-6 text-4xl font-bold text-center'>Frequently Asked Questions</h1>
      {faqs.map((faq, index) => (
        <Accordion key={faq._id} open={open === index} icon={<Icon id={index} open={open} />}>
          <AccordionHeader onClick={() => setOpen(open === index ? null : index)}>
            {faq.faqtitle}
          </AccordionHeader>
          <AccordionBody>
            {faq.faqdescription}
            <div className="text-sm text-gray-500">Posted on: {new Date(faq.createdAt).toLocaleDateString()}</div>
            {faq.replies.length > 0 && (
                <div className="mt-4">
                  {faq.replies.map((reply, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-100 rounded-md">
                      <div>
                        <span className="font-bold text-gray-800">Admin:</span> {reply}
                      </div>
                    </div>
                  ))}
                </div>
              )}
          </AccordionBody>
        </Accordion>
      ))}
      <Link to="/faq" className="flex justify-center mt-4">
            <Button className="bg-green-500 btn btn-primary">View More FAQs</Button>
          </Link><br/><br/>
    </div>
  );
}
