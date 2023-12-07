import { useState } from 'react'
import SignUpPage from './pages/SignupPage';
import LoginPage from "./pages/LoginPage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import CurriculumPage from './pages/CurriculumPage';
import HomePage from './pages/Homepage';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>      
        <Route path="/" element={<HomePage />} />
        <Route path="/curriculum" element={ <CurriculumPage /> } />
        <Route path="/login" element={<IsAnon> <LoginPage /> </IsAnon>} />
        <Route path="/signup" element={<IsAnon> <SignUpPage /> </IsAnon>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;