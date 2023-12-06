import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function CurriculumPage() {
  const {user}= useContext(AuthContext)

    return (
      <div>
        <h1>CurriculumPage Page</h1>
        {user && <p>{user.email}</p>}
      </div>
    );
  }
  
  export default CurriculumPage;