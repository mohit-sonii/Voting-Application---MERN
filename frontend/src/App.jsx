

import Login from "./Components/Login"
import ForgetPass from "./Components/ForgetPass"
import Register from "./Components/Register"
import Home from "./Home/Home"
import Profile from "./Components/Profile"
import React from "react"
import { useState, useEffect } from "react"
import { userContext } from "./context.js"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import NewPass from "./Components/NewPass"
import { candidateContext } from "./context.js"
import CandidateList from "./Components/CandidateList.jsx"
import SpecificCandidate from "./Components/SpecificCandidate.jsx"
import { Provider } from "react-redux"
import { store } from "./Redux/store.js"

function App() {
     const [visitorType, setWhoTheVisitor] = useState('');
     const [visitorId, setVisitorId] = useState('')
     const [candidateId, setCandidateId] = useState('')

     const changeVisitorType = (value) => {
          setWhoTheVisitor(value);
     }
     const updateCandidateId = (value) => {
          setCandidateId(value)
     }
     const updateVisitorId = (value) => {
          setVisitorId(value)
     }

     return (
          <>
               <BrowserRouter>
                    <Provider store={store}>
                         <userContext.Provider value={{ visitorType, changeVisitorType, visitorId, updateVisitorId }}>
                              <candidateContext.Provider value={{ candidateId, updateCandidateId }}>
                                   <Routes>
                                        <Route path="/" element={<Home />} />
                                        <Route path="/:id" element={<Home />} />
                                        <Route path="/api/v1/auth/register" element={<Register />} />
                                        <Route path="/api/v1/auth/login" element={<Login />} />
                                        <Route path="/api/v1/auth/login/forget-password" element={<ForgetPass />} />
                                        <Route path="/api/v1/auth/login/forget-password/create-new-password/:id" element={<NewPass />} />
                                        <Route path="/:id/api/v1/candidates/candidate-list" element={<CandidateList />} />
                                        <Route path="/:id/api/v1/candidates/candidate-list/:id" element={<SpecificCandidate />} />
                                   </Routes>
                              </candidateContext.Provider>
                         </userContext.Provider>
                    </Provider>
               </BrowserRouter >
          </>
     )
}

export default App