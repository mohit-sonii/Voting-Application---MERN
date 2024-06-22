// Navbar.js
import image from '../../assets/logo.png';
import Button from './Button';
import '../Styles/NavBar.css';
import { Link, useParams } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { useAuth } from '../Context';
// import { useContext } from 'react';
// scrollLink is used to add a smooth scrolling effect when a user click on the item in the navbar it will navigate to that section

const Navbar = () => {
     // include the state value from the context in order to response accordingly
     const { userType } = useAuth()
     const id = localStorage.getItem('id')
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
                              <ScrollLink to="results" smooth={true} duration={1000}>
                                   Results
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
                         {/* if the visitor validate as user then do show "Profile"  in the NavBar  */}
                         
                         {userType === 'user' &&
                              <Link to={`/user/profile/${id}`}>
                                   <li>
                                        Profile
                                   </li>
                              </Link>
                         }
                    </ul>
                    {/* if the user type is user then do should " Vote Now" button and it will navigate to the candidate route to vote but if not then do register button with signup route */}
                    {userType === 'user' ? <Button innerText="Vote Now" /> :
                         <Button innerText="Register" link="api/v1/auth/register" />
                    }
               </div>
          </nav>
     );
};

export default Navbar;
