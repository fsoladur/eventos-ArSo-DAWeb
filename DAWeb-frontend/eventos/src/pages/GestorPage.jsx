import React from 'react';

const GestorPage = () => {
  return (
    <div className="GestorPage container my-5">
      <h1 className="h4 fw-bold text-center">¿Que te apetece hacer hoy Gestor?</h1>

      <div className="d-flex justify-content-center my-4">
        <div className="card text-center mx-3">
          <div className="card-body">
            <h5 className="card-title">Gestionar Espacios</h5>
            <p className="card-text">Gestiona los espacios de la plataforma.</p>
            <a href="/home/espacios" className="btn btn-primary text-white fw-bold">Ir a Espacios</a>
          </div>
        </div>

        <div className="card text-center" >
          <div className="card-body">
            <h5 className="card-title">Gestionar Eventos</h5>
            <p className="card-text">Gestiona los eventos de la plataforma.</p>
            <a href="/home/eventos" className="btn btn-primary text-white fw-bold">Ir a Eventos</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestorPage;
