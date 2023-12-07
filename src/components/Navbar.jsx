import { Link } from "react-router-dom"
import { HashLink } from "react-router-hash-link"

function Navbar (){
    return (
    <nav className="navbar">
        <Link to={"/"}>Logo</Link>
        <HashLink to={"/#about-us"}>About Us</HashLink>
        <HashLink to={"/#contact"}>Contact</HashLink>
        <HashLink to={"/#faq"}>FAQ</HashLink>
        <Link to={"/login"}>Login</Link>
        <Link to={"/signup"}>SignUp</Link>
    </nav>
    )
}

export default Navbar