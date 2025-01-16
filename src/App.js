import React, { useState } from "react";
import "./App.css";
import Nav from "./Components/Nav";
import { Route, Routes } from "react-router-dom";
import AllTasks from "./pages/AllTasks";
import Today from "./pages/Today";
import Planned from "./pages/Planned";
import Important from "./pages/Important";
import Assigned from "./pages/Assigned";
import { useInfo } from "./context/nav";

function App() {
 const [key]=useInfo();

  return (
    <div className={key.dark? "App text-white bg-dark":"App"} >
     <Nav/>
     <Routes>
     <Route
          path="/" 
          element={<AllTasks />}
           />
     <Route
          path="/today" 
          element={<Today />}
           />
     <Route
          path="/planned" 
          element={<Planned />}
           />
     <Route
          path="/important" 
          element={<Important />}
           />
     <Route
          path="/assigned" 
          element={<Assigned />}
           />
     </Routes>
    </div>
  );
}

export default App;
