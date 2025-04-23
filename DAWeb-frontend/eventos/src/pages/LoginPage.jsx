import React from 'react';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/NavBar/Navbar';
import Login from '../components/Login/Login';
import { useAuth } from '../context/AuthContext';
import { login } from '../services/AuthService';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify'; // Importa ToastContainer

const LoginPage = () => {
  const { setUser } = useAuth();

  const handleSubmit = async dto => {
    try {
      const user = await login(dto);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      window.location.href = '/home';
    } catch (error) {
      toast.error(error.message, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined
      });
    }
  };

  return (
    <>
      <Navbar session={false} />
      <Login onHandleSubmit={handleSubmit} />
      <Footer />
      <ToastContainer />
    </>
  );
};

export default LoginPage;
