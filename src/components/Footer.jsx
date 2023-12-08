import { Link } from "react-router-dom"
import "../styles/Footer.css"

function Footer (){
    return (
    <footer className="footer">
        <Link to={"/"}>Logo</Link>
        <p>Copyright 2023 - Curriculum Builder</p>
        
    </footer>
    )
}

export default Footer