import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import { AddItems } from './pages/Add-items/Add-items';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { ProductDetails } from './components/ProductDetails';
import ListProducts from './pages/List/List_Products';
import { NotFound404 } from './pages/404/404';

const rootElement = document.getElementById('root');
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="list" element={<ListProducts />}>
        <Route path=":product" element={<ProductDetails />} />
      </Route>
      <Route path="add-items" element={<AddItems />} />
      <Route path="*" element={<NotFound404 />} />
    </Routes>
  </BrowserRouter>,
  rootElement,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
