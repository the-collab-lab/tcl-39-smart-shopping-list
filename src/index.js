import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import { Nav } from './components/Nav';
import { AddItems } from './pages/Add-items/Add-items';
import { List } from './pages/List/List';
import * as serviceWorker from './serviceWorker';

const rootElement = document.getElementById('root');
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="list" element={<List />} />
      <Route path="add-items" element={<AddItems />} />
    </Routes>
    <Nav />
  </BrowserRouter>,
  rootElement,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
