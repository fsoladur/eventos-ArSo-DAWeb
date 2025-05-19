import React from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';

const UserEventSearchBar = ({ onFilter, placeholder }) => {
  const handleSubmit = e => {
    e.preventDefault();
    onFilter(e);
  };

  return (
    <Form className="mb-0" onSubmit={handleSubmit}>
      <InputGroup>
        <Form.Control
          type="text"
          name="searchTerm"
          className="rounded"
          placeholder={placeholder || 'Buscar eventos...'}
        />
        <Button variant="primary" type="submit" className="ms-2 rounded">
          Buscar
        </Button>
      </InputGroup>
    </Form>
  );
};

export default UserEventSearchBar;
