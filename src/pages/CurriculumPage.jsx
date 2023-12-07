import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import "../styles/Curriculum.css"

function CurriculumPage() {
  const {user}= useContext(AuthContext)

    return (
      <div className="main-container">
        <div className="form-container">
          <h1>CurriculumPage Page</h1>
          {user && <p>{user.email}</p>}
        </div>
        <div className="preview-container">

        </div>
        
      </div>
    );
  }
  
  export default CurriculumPage;