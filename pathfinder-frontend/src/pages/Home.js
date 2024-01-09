import React from 'react';
import '../App.css';
import Cards from '../HomePage/Cards';
import HeroSection from '../HomePage/HeroSection';
import Footer from '../HomePage/Footer';
import NavbarForHome from '../HomePage/NavbarForHome';

function Home() {
  return (
  
    <div>
   <NavbarForHome/>
      <HeroSection />
      <Cards />
      
  
  </div>
 );
{/*<div>Home</div>*/}
  
}

export default Home;