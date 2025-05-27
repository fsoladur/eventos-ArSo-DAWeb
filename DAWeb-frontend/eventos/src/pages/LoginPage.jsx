import React from 'react';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/NavBar/Navbar';
import Login from '../components/Login/Login';
import { useAuth } from '../context/useAuth';
import { login } from '../services/authService';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { authLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async dto => {
    try {
      const user = await login(dto);
      authLogin({ newUser: user });
      return navigate(
        user.roles.includes('USUARIO') ? '/home/usuario' : '/home/gestor',
        { replace: true }
      );
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
    </>
  );
};

export default LoginPage;
