import React from 'react';
import './Footer.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import logo from '../img/logo1.jpg';
import SocialFollow from './SocialFollow';

function Footer() {
  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          Join the Adventure newsletter to receive our best vacation deals
        </p>
        <p className='footer-subscription-text'>
          You can unsubscribe at any time.
        </p>
        <div className='input-areas'>
          <form>
            <input
              className='footer-input'
              name='email'
              type='email'
              placeholder='Your Email'
            />
            <a href="/login" className='button'>Subscribe</a>
          </form>
        </div>
      </section>
      <div className='footer-links'>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>About Us</h2>
            <Link to='/sign-up'>How it works</Link>
            <Link to='/'>Testimonials</Link>
            <Link to='/'>Careers</Link>

          </div>
          <div className='footer-link-items'>
            <h2>Contact Us</h2>
            <Link to='/'>Contact</Link>
            <Link to='/'>Destinations</Link>

          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>Videos</h2>
            <Link to='/'>Submit Video</Link>

          </div>
          <div className='footer-link-wrapper'>
            <div className='footer-link-items'>
              <h2>Social Media</h2>
              <SocialFollow />
            </div>
          </div>
        </div>
      </div>
      <section className='social-media'>
        <div className='social-media-wrap'>

          <small className='website-rights'>PathFinder © 2024</small>

        </div>
      </section>
    </div>
  );
}

export default Footer;
