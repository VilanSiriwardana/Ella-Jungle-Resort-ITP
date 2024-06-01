// CustomPopup.js
import React from 'react';

const CustomPopup = ({ isOpen, message, onClose, type = 'info' }) => {
  if (!isOpen) return null;

  const backgroundColor = type === 'error' ? 'bg-red-500' : 'bg-theme-green';

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className={`p-5 w-96 rounded-2xl ${backgroundColor}  `}>
        <div className="flex justify-between items-center">
          <h2 className="text-lg text-black font-bold font-inika text-center">{type === 'error' ? 'Error' : 'Success'}</h2>
          <button onClick={onClose}>X</button>
        </div>
        <p className="mt-4 text-black text-lg  font-inika text-center">{message}</p>
        <div className="text-right mt-4">
          <button
            onClick={onClose}
            className="bg-white text-black font-inika px-4 py-1 rounded hover:bg-gray-200"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomPopup;
