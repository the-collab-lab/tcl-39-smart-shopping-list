import React from 'react';
import NewToken from '../../components/newToken/NewToken';
import './CreateList.css';
import { ArchivalNoticeModal } from '@the-collab-lab/shopping-list-utils';

const CreateList = () => {
  return (
    <>
      <h1 className="title-home">Welcome to our </h1>
      <img className="image-home" alt="" src="/img/imagen-home.png"></img>
      <h2 className="second-title">Smart Shopping List!</h2>
      <NewToken />
      <ArchivalNoticeModal />
    </>
  );
};

export default CreateList;
