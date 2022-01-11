import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
// import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AddItems } from './components/Add-items';
import { List } from './components/List';
import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
const rootElement = document.getElementById('root');
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="list" element={<List />} />
      <Route path="add-item" element={<AddItems />} />
    </Routes>
    <NavLink
      style={({ isActive }) => ({
        color: isActive ? '#fff' : '#545e6f',
        background: isActive ? '#7600dc' : '#f0f0f0',
      })}
      to="/list"
    >
      List
    </NavLink>
    <NavLink
      style={({ isActive }) => ({
        color: isActive ? '#fff' : '#545e6f',
        background: isActive ? '#7600dc' : '#f0f0f0',
      })}
      to="/add-item"
    >
      Add Item
    </NavLink>
  </BrowserRouter>,
  rootElement,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
