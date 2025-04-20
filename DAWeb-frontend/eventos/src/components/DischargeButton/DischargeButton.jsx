import { Modal, Button } from 'react-bootstrap';
import { useState, Children } from 'react';

const DischargeButton = ({ buttonLabel, children }) => {
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {buttonLabel}
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{buttonLabel}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{Children.only(children)}</Modal.Body>
      </Modal>
    </>
  );
};

export default DischargeButton;
