import React from 'react';
import DischargeSpaceForm from '../components/DischargeSpaceForm/DischargeSpaceForm';
import { toast, ToastContainer } from 'react-toastify';

const HomePage = () => {
  const handleSubmit = async dto => {
    console.log('DTO:', dto);
    try {
      const response = await fetch('https://api.example.com/crear-espacio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto)
      });

      if (!response.ok) {
        throw new Error('Error en la petición');
      }

      toast.success('Espacio creado correctamente.');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al crear el espacio.');
    }
  };

  return (
    <div className="NotFoundPage">
      <h1>
        Ummmmmmmmmmmmmmmmmmmmmmmmmmmmm, parece que no puedes acceder a esta
        ruta, porcuodio porcuala
      </h1>
      <p>Tung Tung Tung sahur</p>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF0Bi9fCwrQBhZBgrnMl5F60rnNaXC6CbEvg&s"
        alt="Tung Tung Tung sahur"
      />
      <DischargeSpaceForm onHandleSubmit={handleSubmit} />
      <ToastContainer />
    </div>
  );
};

export default HomePage;
