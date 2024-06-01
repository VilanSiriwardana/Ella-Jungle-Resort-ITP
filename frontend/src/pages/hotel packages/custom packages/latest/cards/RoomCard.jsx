import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Typography, Button } from '@material-tailwind/react';

export function RoomCard({ room, img, onAddToPackage }) {
  const handleAddToPackage = () => {
    onAddToPackage(room); // Call the onAddToPackage function with the room object
  };

  return (
    <div className='p-[5px]'>
      <Card className='mt-6 w-[300px]'>
        <CardHeader color='blue-gray' className='relative h-[120px] mt-[20px]'>
          <img src={img} alt={room.roomName} />
        </CardHeader>
        <CardBody>
          <Typography variant='h5' color='blue-gray' className='mb-2'>
            {room.roomName}
          </Typography>
          <Typography>
            Room Type: {room.roomType}
            <br />
            Maximum count: {room.maxCount}
            <br />
            Description: {room.description}
            <br />
            Rs.{room.price} per person
            <br />
          </Typography>
        </CardBody>
        <CardFooter className='pt-0'>
          <Button className='m-[5px] bg-green-500' onClick={handleAddToPackage}>
            Add to Package
          </Button>
          <Button className='bg-green-500'>See More</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
