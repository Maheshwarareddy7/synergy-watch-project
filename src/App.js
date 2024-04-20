import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IndividualVideo from "./Components/IndividualVideo";
import Login from "./Components/Login";
import RegistrationForm from "./Components/RegistrationForm";
import GamingVideos from './Components/GamingVideos';
import TrendingVideos from './Components/TrendingVideos';
import SavedVideos from './Components/savedVideos';

function App() {
  return (
    <Router>
      <div className="">
        <Routes>
        <Route exact path="/auth" element={<Login />} />
        <Route exact path="/signup" element={<RegistrationForm />} />
         <Route exact path="/" element={<Home />} />
        <Route exact path="/video/:id" element={<IndividualVideo />} />
        <Route exact path="/gaming" element={<GamingVideos />} />
        <Route exact path="/trending" element={<TrendingVideos />} /> 
        <Route exact path="/saved" element={<SavedVideos />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
