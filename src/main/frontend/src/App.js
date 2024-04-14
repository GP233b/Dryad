import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './views/LoginPage';
import HomePage from "./views/HomePage";
import SignUpPage from "./views/SignUpPage";

function App() {
  return (
      <Router>
        <Routes>

            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomePage/>} />
            <Route path="/SignUp" element={<SignUpPage/>} />
        </Routes>
      </Router>
  );
}

export default App;