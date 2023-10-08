import React from "react";
import { Bars, Nav, NavLink, NavMenu } from "./NavbarElements";

const Navbar = () => {
  const isLoggedIn = localStorage.getItem("isLogged");

  return (
    <>
      <Nav>
        {/* <NavLink to="/">
            <img src={Logonav} className="logoNavBar" width={60} height={50} />
          </NavLink> */}
        <Bars />
        <NavMenu>
          <NavLink to="/flower" activeStyle>
            <span className="accommadationNavTxt">Flowers</span>
          </NavLink>
          <NavLink to="/cakes" activeStyle>
            <span className="foodandBNavTxt">Cakes</span>
          </NavLink>
          <NavLink to="/gifts" activeStyle>
            <span className="galleryBNavTxt">Gift Items</span>
          </NavLink>
          <NavLink to="/eventdeco" activeStyle>
            <span className="thingsToDoNavTxt">Event Decorations</span>
          </NavLink>
          {isLoggedIn ? (
            <NavLink to="/cart" activeStyle>
              <span className="thingsToDoNavTxt">Cart</span>
            </NavLink>
          ) : null}
          {isLoggedIn ? null : (
            <NavLink to="/" activeStyle>
              <span className="thingsToDoNavTxt">Login/Registration</span>
            </NavLink>
          )}
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
