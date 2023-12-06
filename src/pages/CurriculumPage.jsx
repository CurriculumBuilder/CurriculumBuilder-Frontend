import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function CurriculumPage() {
  const {user }= useContext(AuthContext)
    return (
      <div>
        <h1>Curriculum Page</h1>
      </div>
    );
  }
  
  export default CurriculumPage;