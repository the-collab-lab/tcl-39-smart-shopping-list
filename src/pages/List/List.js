import React from 'react';
import ListProducts from '../../components/List_Products';
import { Nav } from '../../components/Nav';

export const List = () => {
  return (
    <main>
      <ListProducts />
      <Nav />
    </main>
  );
};
