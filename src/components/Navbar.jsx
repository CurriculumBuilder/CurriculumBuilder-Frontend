import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import profile from "../assets/profile.png";
import "../styles/Navbar.css";

function Navbar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logOutUser();
    setDropdownOpen(false); 
  };

  return (
    <nav className="navbar">
      <Link to={"/"}>Logo</Link>
      <HashLink to={"/#about-us"}>About Us</HashLink>
      <HashLink to={"/#contact"}>Contact</HashLink>
      <HashLink to={"/#faq"}>FAQ</HashLink>

      {!isLoggedIn && <Link to={"/login"}>Login</Link>}
      {!isLoggedIn && <Link to={"/signup"}>SignUp</Link>}

      {isLoggedIn && (
        <div className="profile-icon-container" onClick={toggleDropdown}>
          <img src={profile} className="profile-icon" />
        </div>
      )}

      {isDropdownOpen && isLoggedIn && (
        <div className="dropdown-menu"  >
          <ul>
            <li>My Profile</li>
            {logOutUser && <li onClick={handleLogout}>Logout</li>}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
