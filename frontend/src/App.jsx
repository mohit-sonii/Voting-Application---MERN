

import Login from "./Components/Login"
import ForgetPass from "./Components/ForgetPass"
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
                         <Route path="/user/auth/forget-password" element={<ForgetPass />} />
                    </Routes>
                    {/* <Footer /> */}
               </BrowserRouter>
          </>
     )
}

export default App
