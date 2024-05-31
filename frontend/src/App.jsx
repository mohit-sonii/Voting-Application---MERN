

import Login from "./Components/Login"
import ForgetPass from "./Components/ForgetPass"
import SignUp from "./Components/SignUp"
import Home from "./Home/Home"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import NewPass from "./Components/NewPass"

function App() {


     return (
          <>
               <BrowserRouter>
                    <Routes>
                         <Route path="/" element={<Home />} />
                         <Route path="/user/auth/signup" element={<SignUp />} />
                         <Route path="/user/auth/login" element={<Login />} />
                         <Route path="/user/auth/forget-password" element={<ForgetPass />} />
                         <Route path="/user/auth/forget-password/create-new-password/:id" element={<NewPass />} />
                    </Routes>
               </BrowserRouter>
          </>
     )
}

export default App
