import React from 'react';
import './App.css';
import Home from "./pages/Home";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search/:query" element={<Home />} />
          </Routes>
      </Router>
  );
}

export default App;
