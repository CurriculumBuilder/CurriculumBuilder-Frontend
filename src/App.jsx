import { useState } from "react";
import SignUpPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import CurriculumPage from "./pages/CurriculumPage";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AllCurriculumsPage from "./pages/AllCurriculumsPage";
import { DropdownProvider } from "./context/DropdownContext";
import UpdateCurriculum from "./pages/UpdateCurriculum";


function App() {
  return (
    <div className="App">
      <DropdownProvider>
        <Navbar /> 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/curriculum"
            element={ 
              <IsPrivate>
                <CurriculumPage />
              </IsPrivate>
            }
          />
          <Route
            path="/my-curriculums"
            element={
              <IsPrivate>
                <AllCurriculumsPage />
              </IsPrivate>
            }
          />
          <Route
            path="/my-curriculums/update-curriculum/:curriculumId"
            element={
              <IsPrivate>
                <UpdateCurriculum/>
              </IsPrivate>
            }
          />
          <Route
            path="/login"
            element={
              <IsAnon>
                {" "}
                <LoginPage />{" "}
              </IsAnon>
            }
          />
          <Route
            path="/signup"
            element={
              <IsAnon>
                {" "}
                <SignUpPage />{" "}
              </IsAnon>
            }
          />
        </Routes>
      </DropdownProvider>
    </div>
  );
}

export default App;
