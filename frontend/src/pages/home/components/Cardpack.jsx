import React from 'react';
import { BookingCard } from './cards'; // Import your BookingCard component

export function BookingCardsContainer() {
  return (
    <div className="grid grid-cols-1 gap-1 pl-6 mx-20 sm:grid-cols-2 lg:grid-cols-3">
      <BookingCard />
      <BookingCard />
      <BookingCard />
    </div>
  );
}
