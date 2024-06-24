// Navbar.js
import image from '../../assets/logo.png';
import Button from './Button';
import '../Styles/NavBar.css';
import { Link, useParams } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import userContext from '../context';
import { useContext } from 'react';
// import { useContext } from 'react';
// scrollLink is used to add a smooth scrolling effect when a user click on the item in the navbar it will navigate to that section

const Navbar = () => {
     // include the state value from the context in order to response accordingly
const {visitorType}=useContext(userContext)
     return (
          <nav className='navbar mt-10 max-sm:justify-center md:gap-4' >
               <div className="leftSide">
                    <img src={image} alt="Logo image" />
                    <p>One Vote</p>
               </div>
               <div className="rightSide">
                    <ul className='text-2xl 2xl:text-4xl'>
                         <li>
                              <Link to='/'>Home</Link>
                         </li>
                         <li>
                              <ScrollLink to="working" smooth={true} duration={1000}>
                                   How it Works
                              </ScrollLink>
                         </li>
                         <li>
                              <ScrollLink to="regulations" smooth={true} duration={1000}>
                                   Rules
                              </ScrollLink>
                         </li>
                         <li>
                              <ScrollLink to="contact" smooth={true} duration={1000}>
                                   Contact Us
                              </ScrollLink>
                         </li>

                         {visitorType === 'user' &&
                              // <Link to>
                                   <li>
                                        Profile
                                   </li>
                              // </Link>
                         }
                    </ul>
                    <Button innerText="Vote Now" />
                    <Button innerText="Register" link="api/v1/auth/register" />
               </div>
          </nav>
     );
};

export default Navbar;
