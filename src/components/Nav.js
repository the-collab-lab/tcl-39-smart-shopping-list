import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';

export const Nav = () => {
  return (
    <nav className="container-nav">
      <NavLink
        className={'nav-link'}
        style={({ isActive }) => ({
          fontWeight: isActive ? 600 : 400,
          color: isActive ? '#000' : '#AAA7AA',
          background: isActive ? '#B39CD0' : '#FBEAFF',
        })}
        to="/list"
      >
        List
      </NavLink>
      <NavLink
        className={'nav-link'}
        style={({ isActive }) => ({
          fontWeight: isActive ? 600 : 400,
          color: isActive ? '#000' : '#AAA7AA',
          background: isActive ? '#B39CD0' : '#FBEAFF',
        })}
        to="/add-items"
      >
        Add Item
      </NavLink>
    </nav>
  );
};
