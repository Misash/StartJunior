
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import CreatePost from "./components/CreatePost";
import Home from "./components/home";
import Project from "./components/Project";
import About from "./components/About";

function App() {
  const [backendData, setBackendData] = useState([{}]);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>  </Route>
        <Route path="/CreatePost" element={<CreatePost />}>  </Route>
        <Route path="/project/:id" element={<Project />}>  </Route>
        <Route path="/About" element={<About />}>  </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
