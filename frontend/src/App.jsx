

import Login from "./Components/Login"
import ForgetPass from "./Components/ForgetPass"
import Register from "./Components/Register"
import Home from "./Home/Home"
import Profile from "./Components/Profile"
import {useAuth} from './Context'
import {Navigate} from 'react-router-dom'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import NewPass from "./Components/NewPass"

function App() {


     return (
          <>
               <BrowserRouter>
                    <Routes>
                         <Route path="/" element={<Home />} />
                         <Route path="/:id" element={<Home />} />
                         <Route path="/api/v1/auth/register" element={<Register />} />
                         <Route path="/api/v1/auth/login" element={<Login />} />
                         <Route path="/api/v1/auth/login/forget-password" element={<ForgetPass />} />
                         <Route path="/api/v1/auth/login/forget-password/create-new-password/:id" element={<NewPass />} />
                         <Route path="/user/profile/:id" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                    </Routes>
               </BrowserRouter>
          </>
     )
}

// create protected route
// here children is the component on which the `ProtectedRoute wrapped to.
const ProtectedRoute = ({ children }) => {
     // chekc the authenticity 
     const { isAuth } = useAuth();
     return isAuth ? children : <Navigate to="/user/auth/signup" />;
     // if it is authentic then do show children other navigate that to the login page.

}
export default App
