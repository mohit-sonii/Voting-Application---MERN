

import "../Styles/SignUp.css"
import { useState } from "react"
import React from 'react'
import { Link } from "react-router-dom"

function Login() {
     const [data, setData] = useState({
          uniqueId: '',
          password: '',
     })

     const handleChange = (e) => {
          const { name, value } = e.target;
          setData({ ...data, [e.target.name]: e.target.value })
          console.log({ ...data, [e.target.name]: e.target.value })
     }
     return (

               <div id="login">
                    <div className="log">
                         <div className="signup-heading flex gap-5 flex-col">
                              <p className='text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold'>Login</p>
                              <p className=" flex flex-row gap-5 sm:text-2xl lg:text-3xl xl:text-2xl font-semibold">Don't Have an Account?
                                   <Link to="/auth/signup">
                                        <span className="login ">Signup</span>
                                   </Link>
                              </p>
                         </div>
                         <div className="signup-form grid gap-10 sm:grid-cols-2">

                              <div className="field uniqueId">
                                   <label className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-light" htmlFor="uniqueId">Enter Aadhar Card Number</label>
                                   <input className="sm:w-3/4 text-sm lg:text-lg xl:text-xl 2xl:text-2xl  font-semibold" name="uniqueId" id="uniqueId" type="number" onChange={handleChange} value={data.uniqueId} />
                              </div>

                              <div className="field password">
                                   <label className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-light" htmlFor="password">Enter  Password </label>
                                   <input className="sm:w-3/4 text-sm lg:text-lg xl:text-xl 2xl:text-2xl  font-semibold" name="password" id="password" type="password" onChange={handleChange} value={data.password} />
                              </div>
                         </div>
                         <div className="button flex gap-8">
                              <button type="submit" id="button" className="text-2xl 2xl:text-3xl py-4 2xl:py-10 px-10 2xl:px-24"><span>Login</span></button>

                              <button type="button" id="back" className="text-2xl 2xl:text-3xl py-4 2xl:py-10 px-10 2xl:px-24">
                                   <Link to="/">
                                        <span>Back</span>
                                   </Link>
                              </button>
                         </div>
                    </div>
               </div>

     )
}

export default Login