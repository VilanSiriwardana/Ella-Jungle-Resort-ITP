import React from "react";

const StarRating = ({ rating, onRatingChange }) => {
  const stars = [];
  
  // Function to handle click event on a star
  const handleStarClick = (index) => {
    // Increment the index by 1 as ratings start from 1
    onRatingChange(index + 1);
  };

  for (let i = 0; i < 5; i++) {
    stars.push(
      <span
        key={i}
        style={{ cursor: "pointer", color: i < rating ? "#ffc107" : "#e4e5e9" }}
        onClick={() => handleStarClick(i)}
      >
        ★
      </span>
    );
  }

  return <div>{stars}</div>;
};

export default StarRating;
