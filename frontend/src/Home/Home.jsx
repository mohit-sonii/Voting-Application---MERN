import Navbar from '../Components/NavBar'
import LandingPage from '../Components/LandingPage'
import './Home.css'
import svg from '../../assets/main.svg'
import Work from '../Components/Work'
import Results from '../Components/Results'
import Rules from '../Components/Rules'
import Form from '../Components/Form'
import { useEffect } from 'react'
// import CountDown from '../Components/CountDown'




function Home() {
     return (
          <div className='home flex   h-full flex-col'>
               <div id="navigation">
                    <Navbar />
               </div>
               <div id="landingPage" style={{ backgroundImage: `url(${svg})` }}>
                    <LandingPage />
               </div>
               <div id="working">
                    <Work />
               </div>
               <div id="results">
                    <Results />
               </div>
               <div id="regulations">
                    <Rules />
               </div>
               {/* <CountDown/> */}
               <div id="form">
                    <Form />
               </div>

          </div >
     )
}

export default Home