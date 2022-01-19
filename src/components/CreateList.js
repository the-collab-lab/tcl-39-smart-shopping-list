import React from 'react';
import { getToken, words } from '@the-collab-lab/shopping-list-utils';

function token() {
  console.log(getToken(words));
}

const CreateList = () => {
  return (
    <>
      <h1>Shopping List!</h1>
      <button onClick={token}>Create a new list</button>
    </>
  );
};

export default CreateList;
