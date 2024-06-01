import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
} from '@material-tailwind/react';

export default function ActivitySummary({ activities, onRemoveFromPackage }) {
  if (!activities || activities.length === 0) {
    return (
      <div>
        <h2></h2>
      </div>
    );
  }

  return (
    <div>
      <h2>Summary</h2>
      <ul>
        {activities.map((activity, index) => (
          <li key={index}>
            <p>Name: {activity.name}</p>
            <p>Description: {activity.description}</p>
            <p>Price: Rs.{activity.price} per person</p>
            <Button onClick={() => onRemoveFromPackage(index)}>Remove</Button> {/* Button to remove the activity */}
          </li>
        ))}
      </ul>
    </div>
  );
}

ActivitySummary.propTypes = {
  activities: PropTypes.array.isRequired,
  onRemoveFromPackage: PropTypes.func.isRequired // Prop type for removal function
};
