import { Link } from "react-router-dom"
import "../styles/Footer.css"

function Footer (){
    return (
    <footer className="footer">
        <Link to={"/"}>Logo</Link>
        <p>Copyright 2023 - Curriculum Builder</p>
        <Link to={"/login"}>Login</Link>
        <Link to={"/signup"}>SignUp</Link>
    </footer>
    )
}

export default Footer