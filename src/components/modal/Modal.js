import React from 'react';
import './Modal.css';

export const Modal = ({ handleClose, modalClass, children }) => {
  const showHideClassName = modalClass
    ? 'modal display-block'
    : 'modal display-none';
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <button className="button_close" onClick={handleClose}>
          X
        </button>
        {children}
      </section>
    </div>
  );
};
