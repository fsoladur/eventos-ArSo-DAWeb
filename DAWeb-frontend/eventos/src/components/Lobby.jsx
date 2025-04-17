import React from 'react';
import Footer from './Footer/Footer';
import Navbar from './NavBar/Navbar';
import { Outlet } from 'react-router-dom';

const Lobby = () => {
  return (
    <div className="Lobby d-flex flex-column min-vh-100">
      <Navbar session={true}/>
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
  
  export default Lobby;