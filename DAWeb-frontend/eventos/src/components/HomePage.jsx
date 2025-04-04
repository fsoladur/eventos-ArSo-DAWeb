import React from 'react';
import Footer from './Footer/Footer';
import Navbar from './NavBar/NavBar';
import Hero from './Hero/Hero';
import About from './About/About';

const HomePage = () => {
    return (
      <div className="homepage">
        <Navbar />
        <Hero />
        <About />
        <Footer />
      </div>
    );
  };
  
  export default HomePage;