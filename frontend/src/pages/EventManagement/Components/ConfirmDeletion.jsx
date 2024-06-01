// ConfirmationModal.js
import React from 'react';

const ConfirmDeletion = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative  top-1/3 mx-auto p-5 w-96 shadow-lg rounded-3xl bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-xl font-bold text-green-800">Confirm Deletion</h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-md text-gray-500">
              Are you sure you want to remove this? This action cannot be undone.
            </p>
          </div>
          <div className="flex items-center py-3">
            <button className="flex items-center ml-16 mx-2 px-4 py-2 bg-red-500 text-white rounded-lg w-24 hover:bg-red-700"
              onClick={onConfirm}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
              Delete
            </button>
            <button
              className="flex items-center mx-2 px-4 py-2 bg-gray-500 text-white rounded-lg w-24 hover:bg-gray-700"
              onClick={onClose} >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeletion;
