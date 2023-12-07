import { Link } from "react-router-dom"

function Navbar (){
    return (
    <nav className="navbar">
        <Link to={"/"}><h1>Logo</h1></Link>
        <Link ><h1>About Us</h1></Link>
        <Link ><h1>Contact</h1></Link>
        <Link ><h1>FAQ</h1></Link>
        <Link to={"/login"}><h1>Login</h1></Link>
        <Link to={"/signup"}><h1>SignUp</h1></Link>
    </nav>
    )
}

export default Navbar