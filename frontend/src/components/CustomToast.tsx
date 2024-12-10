import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';



const CustomToast: React.FC<ToastProps> = ({ show, onClose, title, message, variant }) => {
  return (
    <ToastContainer position="top-start" className="p-3">
      <Toast show={show} onClose={onClose} bg={variant} delay={5000} autohide>
        <Toast.Header>
          <strong className="me-auto">{title}</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default CustomToast;