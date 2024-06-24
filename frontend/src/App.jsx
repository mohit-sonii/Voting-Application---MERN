

import Login from "./Components/Login"
import ForgetPass from "./Components/ForgetPass"
import Register from "./Components/Register"
import Home from "./Home/Home"
import Profile from "./Components/Profile"
import React from "react"
import { useState,useEffect } from "react"
import userContext from "./context.js"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import NewPass from "./Components/NewPass"

function App() {
     const [visitorType, setWhoTheVisitor] = useState('');

     const changeVisitorType = (value) => {
          setWhoTheVisitor(value);
     };

     return (
          <>

               <BrowserRouter>
                    <userContext.Provider value={{ visitorType, changeVisitorType }}>
                         <Routes>
                              <Route path="/" element={<Home />} />
                              <Route path="/:id" element={<Home />} />
                              <Route path="/api/v1/auth/register" element={<Register />} />
                              <Route path="/api/v1/auth/login" element={<Login />} />
                              <Route path="/api/v1/auth/login/forget-password" element={<ForgetPass />} />
                              <Route path="/api/v1/auth/login/forget-password/create-new-password/:id" element={<NewPass />} />
                         </Routes>
                    </userContext.Provider>
               </BrowserRouter>
          </>
     )
}

export default App