import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from 'react-router-dom'

const Header = () => (
  <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
    <Navbar.Brand>React-Redux-test</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <NavLink activeClassName="active" className="nav-link" to="/">Articles</NavLink>
        <NavLink activeClassName="active" className="nav-link" to="/users">Users</NavLink>
        <NavLink activeClassName="active" className="nav-link" to="/photos">Photos</NavLink>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Header;
