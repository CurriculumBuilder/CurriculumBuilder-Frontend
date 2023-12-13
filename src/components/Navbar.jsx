import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../context/auth.context";
import profile from "../assets/profile.png";
import "../styles/Navbar.css";
import { useDropdown } from "../context/DropdownContext";

function Navbar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  const { isDropdownOpen, setDropdownOpen } = useDropdown();

  const dropdownContainerRef = useRef(null);

  const openDropdown = () => {
    setDropdownOpen(true);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const handleLogout = () => {
    logOutUser();
    setDropdownOpen(false);
  };

  return (
    <div className="container-navbar">
      <nav className="navbar">
        <Link to={"/"}>Logo</Link>
        <HashLink to={"/#about-us"}>About Us</HashLink>
        <HashLink to={"/#contact"}>Contact</HashLink>

        {!isLoggedIn && <Link to={"/login"}>Login</Link>}
        {!isLoggedIn && <Link to={"/signup"}>SignUp</Link>}

        {isLoggedIn && (
          <div
            className="profile-dropdown-container"
            ref={dropdownContainerRef}
            onMouseEnter={openDropdown}
            onMouseLeave={closeDropdown}
          >
            <div className="profile-icon-container">
              <img src={profile} className="profile-icon" alt="Profile" />
            </div>

            {isDropdownOpen && (
              <div className="dropdown-menu">
                <ul>
                  <Link to={"/curriculum"}>
                    <li>Create New CV</li>
                  </Link>
                  <Link to={"/my-curriculums"}>
                    <li>My Curriculums</li>
                  </Link>
                  {logOutUser && <li onClick={handleLogout}>Logout</li>}
                </ul>
              </div>
            )}
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
