import React from 'react';
import DischargeButton from '../components/DischargeButton/DischargeButton';
import { Form } from 'react-bootstrap';

const HomePage = () => {
  return (
    <>
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
      </div>

      <div>
        <DischargeButton buttonLabel="Dar de alta espacio">
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" placeholder="Nombre" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Descripción</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Descripción" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Capacidad</Form.Label>
              <Form.Control type="number" placeholder="Capacidad" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Direccion</Form.Label>
              <Form.Control type="text" placeholder="Direccion" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Latitud</Form.Label>
              <Form.Control type="text" placeholder="Latitud" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Longitud</Form.Label>
              <Form.Control type="text" placeholder="Longitud" />
            </Form.Group>
            <div className="d-flex justify-content-end gap-2">
              <button type="submit" className="btn btn-primary btn-sm">
                Guardar
              </button>
            </div>
          </Form>
        </DischargeButton>
      </div>
    </>
  );
};

export default HomePage;
