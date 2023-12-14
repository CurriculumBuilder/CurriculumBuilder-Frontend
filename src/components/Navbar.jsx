import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../context/auth.context";
import profile from "../assets/profile.png";
import "../styles/Navbar.css";
import { useDropdown } from "../context/DropdownContext";
import HamburgerMenu from "./HamburgerMenu";
import logo from "../assets/curriculum-builder-logo.png";

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
    <div className="container-navbar ">
      <nav className="navbar ">
        <HamburgerMenu />
        <ul className="hidden lg:flex justify-between md:flex gap-5 text-sm">
          <div className="right-0">
            <li className="list-none flex items-center gap-1 hover:text-neutral-400 transition-all h-16">
              <Link to={"/"}>
                {" "}
                <img src={logo} alt="logo" className="w-25 " />
              </Link>
            </li>
          </div>
          <div className=" flex flex-row gap-5">
            <li className="list-none flex items-center gap-1 hover:text-neutral-400 transition-all">
              <HashLink to={"/#about-us"}>About Us</HashLink>
            </li>
            <li className="list-none flex items-center gap-1 hover:text-neutral-400 transition-all">
              <HashLink to={"/#contact"}>Contact</HashLink>
            </li>

            {!isLoggedIn && (
              <li className="list-none flex items-center gap-1 hover:text-neutral-400 transition-all">
                <Link to={"/login"}>Login</Link>
              </li>
            )}
            {!isLoggedIn && (
              <li className="list-none flex items-center gap-1 hover:text-neutral-400 transition-all">
                <Link to={"/signup"}>SignUp</Link>
              </li>
            )}
          </div>
          {isLoggedIn && (
            <div
              className="profile-dropdown-container"
              ref={dropdownContainerRef}
              onMouseEnter={openDropdown}
              onMouseLeave={closeDropdown}
            >
              <li className="profile-icon-container list-none ">
                <img src={profile} className="profile-icon" alt="Profile" />
              </li>

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
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
