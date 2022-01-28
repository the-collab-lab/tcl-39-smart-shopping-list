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
//set state class to modal 'Duplicated Product Msg'
export const useModalFunctionsMssgDuplicatedProduct = () => {
  const [msgProductDuplicatedModal, setMssgProductDuplicatedModal] =
    useState(false);
  //hidden and show modal 'Duplicated Product Msg' functions
  const showModalMssgProductDuplicated = () => {
    setMssgProductDuplicatedModal(true);
  };
  const hideModalMssgProductDuplicated = () => {
    setMssgProductDuplicatedModal(false);
  };
  return {
    msgProductDuplicatedModal,
    showModalMssgProductDuplicated,
    hideModalMssgProductDuplicated,
  };
};
