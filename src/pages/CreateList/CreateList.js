import React from 'react';
import NewToken from '../../components/newToken/NewToken';
import './CreateList.css';

const CreateList = () => {
  return (
    <>
      <h1 className="title-home">Welcome to our </h1>
      <img className="image-home" alt="" src="/img/imagen-home.png"></img>
      <h2 className="second-title">Smart Shopping List!</h2>
      <NewToken />
    </>
  );
};

export default CreateList;
