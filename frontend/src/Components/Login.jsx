

import api from "../axiosInstance.js"
import "../Styles/Login.css"
import {userContext} from "../context.js"
import { useState, useEffect, useContext } from "react"
import React from 'react'
import { Link, useNavigate } from "react-router-dom"

function Login() {
     const [data, setData] = useState({
          uniqueId: '',
          password: '',
     })
     const [err, setErr] = useState('')

     const handleChange = (e) => {
          const { name, value } = e.target;
          setData({ ...data, [name]: value })
     }

     const navigate = useNavigate()
     const { visitorType, changeVisitorType } = useContext(userContext)
       
     const handleSubmit = async (e) => {
          e.preventDefault();
          try {
               const user = {
                    uniqueId: data.uniqueId,
                    password: data.password
               }
               const response = await api.post('api/v1/auth/login', user, {
                    headers: {
                         "Content-Type": "application/json"
                    }
               })
               localStorage.setItem("accessToken", response.data.data.accessToken)
               if (response.status === 200) {
                    if (response.data.data.user.role === 'user') {
                         changeVisitorType('user')
                    } else {
                         changeVisitorType('admin')
                    }
                    setData({
                         uniqueId: '',
                         password: '',
                    })
                    navigate(`/${response.data.data.user._id}`)

               } else {
                    throw new Error("Error while login a user")
               }
          } catch (error) {
               setErr(error.response?.data?.message || 'An error occured while login a user')
          }
     }

     useEffect(() => {
          const timer = setTimeout(() => {
               setErr('');
          }, 2000);

          return () => clearTimeout(timer); // Clear the timeout if the component unmounts or dependencies change
     }, [err]);

     return (

          <div id="login">
               {err && <h1 className="text-xl">{err}</h1>}
               <div className="log">
                    <div className="signup-heading flex gap-5 flex-col">
                         <p className='text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold'>Login</p>
                         <p className=" flex flex-row gap-5 sm:text-2xl lg:text-3xl xl:text-2xl font-semibold">Need an Account?
                              <Link to="/api/v1/auth/register">
                                   <span className="login ">Register</span>
                              </Link>
                         </p>
                    </div>
                    <form className="flex" onSubmit={handleSubmit}>
                         <div className="signup-form grid gap-10 sm:grid-cols-2">
                              <div className="field uniqueId">
                                   <label className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-light" htmlFor="uniqueId">Enter Aadhar Card Number</label>
                                   <input className="sm:w-3/4 text-sm lg:text-lg xl:text-xl 2xl:text-2xl  font-semibold" name="uniqueId" id="uniqueId" type="text" maxLength={'12'} onChange={handleChange} value={data.uniqueId} />
                              </div>

                              <div className="field password">
                                   <label className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-light" htmlFor="password">Enter  Password </label>
                                   <input className="sm:w-3/4 text-sm lg:text-lg xl:text-xl 2xl:text-2xl  font-semibold" name="password" id="password" type="password" onChange={handleChange} value={data.password} />
                                   <p className="text-sm sm:text-xl cursor-pointer forget-password ">
                                        <Link to="forget-password">
                                             Forget Password?
                                        </Link>
                                   </p>
                              </div>
                         </div>
                         <div className="button flex gap-8">
                              <button type="submit" id="button" className="text-2xl 2xl:text-3xl py-4 2xl:py-10 px-10 2xl:px-24"><span>Login</span></button>

                              <button type="button" id="back" className="text-2xl 2xl:text-3xl py-4 2xl:py-10 px-10 2xl:px-24">
                                   <Link to="/api/v1/auth/register">
                                        <span>Back</span>
                                   </Link>
                              </button>
                         </div>
                    </form>
               </div>
          </div>

     )
}

export default Login