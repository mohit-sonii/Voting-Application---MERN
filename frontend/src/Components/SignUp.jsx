
import "../Styles/SignUp.css"
import { useState } from "react"
import React from 'react'
import { Link } from "react-router-dom"
import { CSSTransition } from 'react-transition-group'


function SignUp() {
     const [data, setData] = useState({
          firstname: '',
          lastname: '',
          voter: '',
          uniqueId: '',
          password: '',
          dob: ''
     })

     const handleChange = (e) => {
          const { name, value } = e.target;
          setData({ ...data, [e.target.name]: e.target.value })
          console.log({ ...data, [e.target.name]: e.target.value })
     }
     return (
          <CSSTransition
               in={true}
               appear={true}
               timeout={300}
               classNames="fade"
          >

               <div id="signup">
                    <div className="signup">
                         <div className="signup-heading flex gap-5 flex-col">
                              <p className='text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold'>Register</p>
                              <p className=" flex flex-row gap-5 sm:text-2xl lg:text-3xl xl:text-2xl font-semibold">Already Have an Account?
                                   <Link to="/auth/login">
                                   <span className="login">Login</span>
                                   </Link>
                              </p>
                         </div>
                         <div className="signup-form grid gap-10 sm:grid-cols-2">

                              <div className="field firstName">
                                   <label className="text-2xl 2xl:text-4xl font-light" htmlFor="firstname">Enter your First Name</label>
                                   <input className="sm:w-3/4 text-sm lg:text-lg xl:text-xl 2xl:text-2xl  font-semibold" name="firstname" id="firstName" type="text" onChange={handleChange} value={data.firstname} />
                              </div>

                              <div className="field lastName">
                                   <label className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-light" htmlFor="lastname">Enter your Last Name</label>
                                   <input className="sm:w-3/4 text-sm lg:text-lg xl:text-xl 2xl:text-2xl  font-semibold" name="lastname" id="lastName" type="text" onChange={handleChange} value={data.lastname} />
                              </div>

                              <div className="field uniqueId">
                                   <label className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-light" htmlFor="uniqueId">Enter Aadhar Card Number</label>
                                   <input className="sm:w-3/4 text-sm lg:text-lg xl:text-xl 2xl:text-2xl  font-semibold" name="uniqueId" id="uniqueId" type="number" onChange={handleChange} value={data.uniqueId} />
                              </div>

                              <div className="field voter">
                                   <label className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-light" htmlFor="voter">Enter your Voter Card Number</label>
                                   <input className="sm:w-3/4 text-sm lg:text-lg xl:text-xl 2xl:text-2xl  font-semibold" name="voter" id="voter" type="text" onChange={handleChange} value={data.voter} />
                              </div>

                              <div className="field dob">
                                   <label className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-light" htmlFor="dob">Enter your Date of Birth</label>
                                   <input className="sm:w-3/4 text-sm lg:text-lg xl:text-xl 2xl:text-2xl  font-semibold" name="dob" id="dob" type="date" onChange={handleChange} value={data.dob} />
                              </div>

                              <div className="field password">
                                   <label className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-light" htmlFor="password">Create Password </label>
                                   <input className="sm:w-3/4 text-sm lg:text-lg xl:text-xl 2xl:text-2xl  font-semibold" name="password" id="password" type="password" onChange={handleChange} value={data.password} />
                              </div>
                         </div>
                         <div className="button flex gap-8">
                              <button type="submit" id="button" className="text-2xl 2xl:text-3xl py-4 2xl:py-10 px-10 2xl:px-24"><span>Register</span></button>

                              <button type="button" id="back" className="text-2xl 2xl:text-3xl py-4 2xl:py-10 px-10 2xl:px-24">
                                   <Link to="/">
                                        <span>Back</span>
                                   </Link>
                              </button>
                         </div>
                    </div>
               </div>
          </CSSTransition>

     )
}

export default SignUp