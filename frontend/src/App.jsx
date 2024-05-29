

import Footer from "./Components/Footer"
import Login from "./Components/Login"
import Navbar from "./Components/NavBar"
import SignUp from "./Components/SignUp"
import Home from "./Home/Home"
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {


     return (
          <>
               <BrowserRouter>
                    {/* <Navbar /> */}
                    <Routes>
                         <Route path="/" element={<Home />} />
                         <Route path="/user/auth/signup" element={<SignUp />} />
                         <Route path="/user/auth/login" element={<Login />} />
                    </Routes>
                    {/* <Footer /> */}
               </BrowserRouter>
          </>
     )
}

export default App
