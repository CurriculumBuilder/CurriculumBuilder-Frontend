import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function HomePage() {

  const {isLoggedIn}= useContext(AuthContext)

    return (
      <div>
        <h1>Home Page</h1>
        {isLoggedIn && <p>I'm in</p>}
      </div>
    );
  }
  
  export default HomePage;