import { Modal, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const DischargeButton = ({ buttonLabel, children, onClose}) => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);

    if (typeof onClose === 'function') {
      onClose();
    }
  };

  useEffect(() => {
    return () => {
      if (showModal && typeof onClose === 'function') {
        onClose();
      }
    };
  }, []); 

  return (
    <>
      <Button variant="primary text-white w-25" onClick={handleShow}>
        {buttonLabel}
      </Button>

      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal}
        onHide={handleClose}
      >
        <Modal.Header className="bg-dark" closeButton>
          <Modal.Title className='text-primary fw-bold'>{buttonLabel}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {typeof children === 'function' ? children(handleClose) : children}
        </Modal.Body>
      </Modal>
    </>
  );
};

DischargeButton.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired
};

export default DischargeButton;
