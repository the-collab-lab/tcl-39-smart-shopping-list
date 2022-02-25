import * as React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';

export const Nav = () => {

  return (
    <nav>
      <NavLink
        className="nav-link"
        style={({ isActive }) => ({
          color: isActive ? '#6691ED' : '#DEDEDE',
        })}
        to="/list"
      >
        <span class="material-icons md-36">view_list</span>
      </NavLink>
      <NavLink
        className="nav-link"
        style={({ isActive }) => ({
          color: isActive ? '#6691ED' : '#DEDEDE',
        })}
        to="/add-items"
      >
        <span class="material-icons md-36">add_circle</span>
      </NavLink>
      <NavLink
        className="nav-link"
        style={({ isActive }) => ({
          color: isActive ? '#6691ED' : '#DEDEDE',
        })}
        to="/"
      >
        <span class="material-icons md-36">exit_to_app</span>
      </NavLink>
    </nav>
  );
};
