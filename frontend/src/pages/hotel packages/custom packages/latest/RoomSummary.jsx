import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
  } from '@material-tailwind/react';

export default function RoomSummary({ rooms, onRemoveFromPackage }) {
  if (!rooms || rooms.length === 0) {
    return (
      <div>
        <h2>Room Summary</h2>
        <p>No rooms selected</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Room Summary</h2>
      <ul>
        {rooms.map((room, index) => (
          <li key={index}>
            <p>Name: {room.roomName}</p>
            <p>Type: {room.roomType}</p>
            <p>Maximum count: {room.maxCount}</p>
            <p>Description: {room.description}</p>
            <p>Price: Rs.{room.price} per person</p>
            <Button onClick={() => onRemoveFromPackage(index)}>Remove</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

RoomSummary.propTypes = {
  rooms: PropTypes.array.isRequired,
  onRemoveFromPackage: PropTypes.func.isRequired,
};
