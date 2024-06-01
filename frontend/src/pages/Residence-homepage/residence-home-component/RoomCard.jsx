import React from 'react'

const RoomCard = ({imageUrl, Title, Description}) =>{
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg hover:scale-up-110 transition duration-115 ease-in-out">
      <img className="w-full" src={imageUrl} alt="test" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{Title}</div>
        <p className="text-gray-700 text-base">{Description}</p>
      </div>
    </div>
  )
}

export default RoomCard;