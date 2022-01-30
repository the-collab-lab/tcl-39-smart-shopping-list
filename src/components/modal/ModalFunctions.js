import { useState } from 'react';

//set state class to modal 'Successfully Product Added Msg'
export const useModalFunctions = () => {
  const [modalClass, setmodalClass] = useState(false);
  const showModal = () => setmodalClass(true);
  const hideModal = () => setmodalClass(false);

  return {
    modalClass,
    showModal,
    hideModal,
  };
};
