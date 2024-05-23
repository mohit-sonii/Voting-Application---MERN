import image from '../../assets/logo.png'
import Button from './Button';
import '../Styles/NavBar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
     return (
          <nav className='navbar  max-sm:justify-center md:gap-4' >
               <div className="leftSide">
                    <img src={image} alt="Logo image" />
                    <p>One Vote</p>
               </div>
               <div className="rightSide">
                    <ul className='text-2xl  2xl:text-4xl'>
                         <li>
                             <Link to='/'> Home</Link>
                         </li>
                         <li>
                              How it Works
                         </li>
                         <li>
                              Results
                         </li>
                         <li>Rules</li>
                         <li>Contact Us</li>
                    </ul>
                    <Button innerText="Register" />
               </div>
          </nav>
     );
};

export default Navbar;
