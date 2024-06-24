
import logo from "../../assets/logo.png"
import "../Styles/Footer.css"
import React from 'react'
import { Link as ScrollLink } from "react-scroll"
import SocialMedia from "./SocialMedia"
import facebook from "../../assets/facebook.png"
import instagram from "../../assets/instagram.png"
import reddit from "../../assets/reddit.png"
import linkedin from "../../assets/linkedin.png"
import github from "../../assets/github.png"
function Footer() {
     return (
          <footer className="grid gap-20 sm:grid-cols-12">
               <div className="leftSection sm:col-span-3">
                    <img src={logo} alt="Logo image" />
                    <p className=" text-3xl lg:text-4xl font-extrabold">One Vote</p>
               </div>
               <div className="rightSection sm:col-span-9 grid ">
                    <div className="useful-links">
                         <p className="text-3xl lg:text-3xl font-extrabold">Useful Links</p>
                         <div className="items">
                              <ul className='text-2xl  2xl:text-4xl'>
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
                              </ul>

                         </div>
                    </div>
                    <div className="follow">
                         <p className="text-3xl lg:text-3xl font-extrabold">Follow Us</p>
                         <div className="media-icons">
                              <SocialMedia icon={facebook} link={'bento.me/mohit-sonii'} />
                              <SocialMedia icon={instagram} link={'instagram.com/developer.mohit'} />
                              <SocialMedia icon={linkedin} link={'linkedin.com/in/mohit-soni-808984265/'} />
                              <SocialMedia icon={reddit} link={'bento.me/mohit-sonii'} />
                              <SocialMedia icon={github} link={'github.com/mohit-sonii'} />
                         </div>
                    </div>
               </div>
          </footer>
     )
}

export default Footer