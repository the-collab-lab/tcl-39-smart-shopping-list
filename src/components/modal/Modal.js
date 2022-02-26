import React from 'react';
import './Modal.css';

export const Modal = ({ handleClose, modalClass, children, iconMaterial, colorIcon }) => {
  const showHideClassName = modalClass
    ? 'modal display-block'
    : 'modal display-none';
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <button className="button_close" onClick={handleClose}>
          X
        </button>
        <div className='container-modal-mssg'>
          <p>{children}</p>
          <span className={`material-icons ${colorIcon}`}>{iconMaterial}</span>
        </div>
      </section>
    </div>
  );
};
