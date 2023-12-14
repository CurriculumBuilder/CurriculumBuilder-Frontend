import { Link } from "react-router-dom"
import "../styles/Footer.css"
import logo from "../assets/curriculum-builder-logo.png"

function Footer (){
    return (
    <footer className="footer ">
        <Link to={"/"}> <img src={logo} alt="" className="w-25" /></Link>
        <p>Copyright 2023 - Curriculum Builder</p>
        
    </footer>
    )
}

export default Footer