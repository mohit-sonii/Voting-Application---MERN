

import Footer from "./Components/Footer"
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
                         <Route path="/auth/signup" element={<SignUp />} />
                    </Routes>
                    {/* <Footer /> */}
               </BrowserRouter>
          </>
     )
}

export default App
