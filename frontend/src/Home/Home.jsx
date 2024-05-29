import Navbar from '../Components/NavBar'
import LandingPage from '../Components/LandingPage'
import './Home.css'
import svg from '../../assets/main.svg'
import Work from '../Components/Work'
import Results from '../Components/Results'
import Rules from '../Components/Rules'
import Form from '../Components/Form'
import Footer from '../Components/Footer'
import SignUp from '../Components/SignUp'


function Home() {
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
               <div id="results">
                    <Results />
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
               {/* <SignUp/> */}

          </div >
     )
}

export default Home