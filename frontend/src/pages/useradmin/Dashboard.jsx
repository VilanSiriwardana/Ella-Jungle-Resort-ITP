import React from 'react';
import { CardDefault } from './components/FunctionCard';

export default function Dashboard() {
  return (
    <div className='mx-[200px] my-[50px]'>
      <div className='flex flex-wrap'>
        <CardDefault
          name='User Management'
          path='/all'
          link='https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80'
        />
        <CardDefault
          name='Hotel Packages Management'
          path='/add'
          link='https://media.istockphoto.com/id/1160947136/photo/couple-relax-on-the-beach-enjoy-beautiful-sea-on-the-tropical-island.jpg?s=612x612&w=0&k=20&c=WJWEH22TFinjI0edzblfH-Nw0cdBfPX5LV8EMvs8Quo='
        />
        <CardDefault
          name='Finance Management'
          path="/financereport"
          link='https://media.istockphoto.com/id/1432903655/photo/finance-accounting-and-fintech-a-man-on-a-computer-and-calculator-working-out-his-business.webp?b=1&s=170667a&w=0&k=20&c=9q6fEaL4xFsF9VWNcwqUrhTysrwB_cpYwC4V6opkJy8='
        />
        <CardDefault
          name='Residence Management'
          path='/residenceAdmin'
          link='https://media.istockphoto.com/id/1390233984/photo/modern-luxury-bedroom.jpg?s=612x612&w=0&k=20&c=po91poqYoQTbHUpO1LD1HcxCFZVpRG-loAMWZT7YRe4='
        />
        <CardDefault
          name='Event Management'
          path='/eventHome'
          link='https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?cs=srgb&dl=pexels-wendy-wei-1190298.jpg&fm=jpg'
        />
        <CardDefault
          name='Travel Agent Management'
          path='/agency'
          link='https://img.freepik.com/free-photo/full-shot-travel-concept-with-landmarks_23-2149153258.jpg'
        />
        <CardDefault
          name='Health and Safety Management'
          path='/spa'
          link='https://www.fitness-world.in/wp-content/uploads/2022/01/5-Reasons-Why-Your-Residential-Building-Needs-a-Professional-Gym-Banner-1200x620.jpg'
        />
        <CardDefault
          name='Special Activity Management'
          path='/activity'
          link='https://images.healthshots.com/healthshots/en/uploads/2023/07/20143449/hiking.jpg'
        />
      </div>
    </div>
  );
}
