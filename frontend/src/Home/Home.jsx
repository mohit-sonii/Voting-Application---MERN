import Navbar from '../Components/NavBar'
import LandingPage from '../Components/LandingPage'
import './Home.css'
import svg from '../../assets/main.svg'
import Work from '../Components/Work'
import Rules from '../Components/Rules'
import Form from '../Components/Form'
import Footer from '../Components/Footer'
import { useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { useEffect } from 'react'
import {userContext} from '../context'


// const location = useLocation() ---> This line uses the useLocation hook from React Router (assuming this is react-router-dom) to get access to the current location object in the React router context. It provides information about the current URL and allows components to react to changes in the URL.

function Home() {

     // The purpose of this code is to react to changes in the URL location and update some state (presumably related to the visitor type) based on the visitorType parameter found in the state object of the current location. This is achieved by utilizing React's hooks (useLocation, useContext, and useEffect) to manage and respond to changes in the application state and URL.
     
     const location = useLocation()
     const { changeVisitorType } = useContext(userContext)
     useEffect(() => {
          if (location.state && location.state.visitorType) {
               changeVisitorType(location.state.visitorType);
          }
     }, [location, changeVisitorType]);



     return (
          <div className='home flex  h-full flex-col'>
               <div id="navigation">
                    <Navbar />
               </div>
               <div id="landingPage" style={{ backgroundImage: `url(${svg})` }}>
                    <LandingPage />
               </div>
               <div id="working">
                    <Work />
               </div>
               <div id="regulations">
                    <Rules />
               </div>
               <div id="contact">
                    <Form />
               </div>
               <div id="footer">
                    <Footer />
               </div>
          </div >
     )
}

export default Home