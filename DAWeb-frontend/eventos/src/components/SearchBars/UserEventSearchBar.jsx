import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';

const UserEventSearchBar = ({ onSearchTermChange, searchTerm, placeholder }) => {
  const handleChange = (e) => {
    onSearchTermChange(e.target.value);
  };

  return (
    <InputGroup>
      <Form.Control
        type="text"
        placeholder={placeholder || 'Buscar...'}
        value={searchTerm}
        onChange={handleChange}
        aria-label="Término de búsqueda"
      />
    </InputGroup>
  );
};

export default UserEventSearchBar;
