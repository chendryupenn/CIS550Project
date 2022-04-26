import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
  } from "shards-react";

class MenuBar extends React.Component {
    render() {
        return(
            <Navbar type="dark" theme="primary" expand="md">
        <NavbarBrand href="/">Movies</NavbarBrand>
          <Nav navbar>
          <NavItem>
              <NavLink active href="/">
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active href="/movies">
                Top Rated
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active  href="/posters" >
                Recommedations
              </NavLink>
            </NavItem>
          </Nav>
      </Navbar>
        )
    }
}

export default MenuBar
