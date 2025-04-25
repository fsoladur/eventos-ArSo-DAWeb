import React from 'react';
import { toast, ToastContainer } from 'react-toastify';

const HomePage = () => {
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
      <ToastContainer />
    </div>
  );
};

export default HomePage;
