import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react';
import PropTypes from 'prop-types';
import './DischargeButton.css';

const DischargeButton = ({
  shortButtonLabel,
  buttonLabel,
  children,
  className
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => {
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);

  return (
    <>
      <Button
        variant="primary"
        className={`text-white discharge-button fw-bold ${className || ''}`}
        onClick={handleShow}
      >
        <span className="button-text-long">{buttonLabel}</span>
        <span className="button-text-short">{shortButtonLabel}</span>
      </Button>

      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal}
        onHide={handleClose}
      >
        <Modal.Header className="bg-dark" closeButton>
          <Modal.Title className="text-primary fw-bold">
            {buttonLabel}
          </Modal.Title>
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
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  className: PropTypes.string,
  shortButtonLabel: PropTypes.string
};

export default DischargeButton;
