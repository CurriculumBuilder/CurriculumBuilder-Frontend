import { useState } from 'react'
import SignUpPage from './pages/SignupPage';
import LoginPage from "./pages/LoginPage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import CurriculumPage from './pages/CurriculumPage';
import HomePage from './pages/Homepage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
    
      <Routes>      
        <Route path="/" element={<HomePage />} />
        <Route
          path="/curriculum"
          element={ <CurriculumPage /> } 
        />

        <Route path="/login" element={<IsAnon> <LoginPage /> </IsAnon>} />

      </Routes>
    </div>
  );
}

export default App;