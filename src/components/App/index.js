import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../../App.css';
import ErrorPage from "../ErrorPage";
import Footer from "../Footer";
import ForgetPassword from "../ForgetPassword";
import Header from "../Header";
import Landing from "../Landing";
import Login from "../Login";
import Signup from "../SignUp";
import Welcome from "../Welcome";
import { IconContext } from "react-icons";

function App() {
  return (
    <Router>
      <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }} >
        <Header />

        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="forgetpassword" element={<ForgetPassword />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        
        <Footer />
      </IconContext.Provider>
    </Router>
      
  );
}

export default App;
