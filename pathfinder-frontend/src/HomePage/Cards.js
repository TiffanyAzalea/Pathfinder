import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Check out these EPIC places for HIKING!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/img-9.jpg'
              text='Explore the hidden waterfall by hiking deep inside the Amazon Jungle'
              label='Adventure'
              path='/login'
            />
            <CardItem
              src='images/img-13.jpg'
              text='Hike through the Mountains to experience the Aurora'
              label='Thrill'
              path='/login'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/img-14.jpg'
              text='Spend a quality time with Family and have more fun camping'
              label='Adrenaline'
              path='/login'
            />
            <CardItem
              src='images/img-10.jpg'
              text='Experience chill weather on Top of the Himalayan Mountains'
              label='Adventure'
              path='/login'
            />
            <CardItem
              src='images/img-12.jpg'
              text='Explore the thrill through the woods'
              label='Adventure'
              path='/login'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
