
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import CreatePost from "./components/CreatePost";
import Home from "./components/home";
import Project from "./components/Project";

function App() {
  const [backendData, setBackendData] = useState([{}]);

  // useEffect(() => {
  //   fetch("/api")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setBackendData(data);
  //     });
  // }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>  </Route>
        <Route path="/CreatePost" element={<CreatePost />}>  </Route>
        <Route path="/project/:id" element={<Project />}>  </Route>
        
      </Routes>
    </BrowserRouter>
  );
}


   // <div>
    //   {typeof backendData.users === "undefined" ? (
    //     <p>Loading..</p>
    //   ) : (
    //     backendData.users.map((user, i) => {
    //       return <p key={i}>{user}</p>;
    //     })
    //   )}
    // </div>

export default App;
