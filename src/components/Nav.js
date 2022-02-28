import * as React from 'react';
import { NavLink } from 'react-router-dom';

import './Nav.css';

export const Nav = () => {
  const removeLocalStorage = () => {
    localStorage.removeItem('token');
  };
  return (
    <nav aria-label="botton nav">
      <NavLink
        className="nav-link"
        style={({ isActive }) => ({
          color: isActive ? '#6691ED' : '#DEDEDE',
        })}
        to="/list"
      >
        <div className="nav-link_span">
          <span className="material-icons md-36">view_list</span>
          <span>List</span>
        </div>
      </NavLink>
      <NavLink
        className="nav-link"
        style={({ isActive }) => ({
          color: isActive ? '#6691ED' : '#DEDEDE',
        })}
        to="/add-items"
      >
        <div className="nav-link_span">
          <span className="material-icons md-36">add_circle</span>
          <span>Add</span>
        </div>
      </NavLink>
      <NavLink
        className="nav-link"
        onClick={removeLocalStorage}
        style={({ isActive }) => ({
          color: isActive ? '#6691ED' : '#DEDEDE',
        })}
        to="/"
      >
        <div className="nav-link_span">
          <span className="material-icons md-36">exit_to_app</span>
          <span>Exit</span>
        </div>
      </NavLink>
    </nav>
  );
};
