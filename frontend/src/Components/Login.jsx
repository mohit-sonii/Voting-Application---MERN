

import axios from "axios"
import "../Styles/Login.css"
import { useState } from "react"
import { useAuth } from "../Context"
// imported 'useAuth', a custom hook that will provide access to state 
import React from 'react'
import { Link, useNavigate } from "react-router-dom"

function Login() {
     // create a state to store the login credentials
     const [data, setData] = useState({
          uniqueId: '',
          password: '',
     })
     // create a state to store the error that may occur while login
     const [err, setErr] = useState('')

     // Context API method to update the state 
     const { setUserType,login } = useAuth()
     

     // change for the input field state
     const handleChange = (e) => {
          const { name, value } = e.target;
          setData({ ...data, [name]: value })
     }

     const navigate = useNavigate()
     // submit to submit the data.
     const handleSubmit = async (e) => {
          // stop for any default behaviour
          e.preventDefault();
          try {
               // take user from data from the data state
               const user = {
                    uniqueId: data.uniqueId,
                    password: data.password
               }
               // use fetch to post the data to login field
               const response = await axios.post('http://localhost:5000/user/auth/login', user, {
                    headers: {
                         "Content-Type": "application/json"
                    }
               })
               // just to show the token or to verify that it is working
               // console.log(response.data.token)
               if (response.status === 200) {
                    setData({
                         uniqueId: '',
                         password: '',
                    })
                    // to store the token in the databse 
                    const { token, userType, id } = response.data

                    //just to check the user type 
                    // console.log(userType)
                    // just to validate the ID of the user 
                    // console.log(id)
                    // to store the token in the localstorage
                    localStorage.setItem('id', id)
                    localStorage.setItem('token', token)

                    // update the state 
                    setUserType(userType)
                    // call the function with the token  and usertype values. This will occur when we login in the site, in this way it will make the perosn authenticate
                    login(token,userType)
                    // navigate to the '/' route with the additional functionliaty
                    navigate('/')

               } else {
                    setErr(response.data.message)
               }
          } catch (error) {
               setErr(error.message)
          }
     }
     return (

          <div id="login">
               {err && <h1 className="text-xl">{err}</h1>}
               <div className="log">
                    <div className="signup-heading flex gap-5 flex-col">
                         <p className='text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold'>Login</p>
                         <p className=" flex flex-row gap-5 sm:text-2xl lg:text-3xl xl:text-2xl font-semibold">Don't Have an Account?
                              <Link to="/user/auth/signup">
                                   {/* on click on Signup button user will navigate to the route menitoned above */}
                                   <span className="login ">Signup</span>
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
                                        <Link to="/user/auth/forget-password">
                                             Forget Password?
                                        </Link>
                                   </p>
                              </div>
                         </div>
                         <div className="button flex gap-8">
                              <button type="submit" id="button" className="text-2xl 2xl:text-3xl py-4 2xl:py-10 px-10 2xl:px-24"><span>Login</span></button>

                              <button type="button" id="back" className="text-2xl 2xl:text-3xl py-4 2xl:py-10 px-10 2xl:px-24">
                                   <Link to="/user/auth/signup">
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