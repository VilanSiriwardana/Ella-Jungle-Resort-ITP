import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from '@material-tailwind/react';
import { Link } from 'react-router-dom';

export function CardDefault({ name, link, path }) {
  return (
    <Link to={path}>
      <Card className='w-[450px] flex-row my-[5px] ml-[100px]'>
        <CardHeader
          shadow={false}
          floated={false}
          className='w-2/5 m-0 rounded-r-none shrink-0'
        >
          <img
            src={link}
            alt='card-image'
            className='object-cover w-full h-full'
          />
        </CardHeader>
        <CardBody className='flex items-center justify-center'>
          <Typography variant='h5' color='blue-gray'>
            {name}
          </Typography>
          <a href='#' className='inline-block'>
            {/* Your link content */}
          </a>
        </CardBody>
      </Card>
    </Link>
  );
}
