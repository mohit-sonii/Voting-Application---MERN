
import "../Styles/SignUp.css"
import { useState } from "react"
import React from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'
import { useNavigate } from "react-router-dom"


function SignUp() {
     const [data, setData] = useState({
          firstname: '',
          lastname: '',
          voter: '',
          uniqueId: '',
          password: ''
     })

     const [err, setErr] = useState('')
     const navigate = useNavigate()
     const handleChange = (e) => {
          const { name, value } = e.target;
          setData({ ...data, [name]: value })
     }

     const handleSubmit = async (e) => {
          e.preventDefault();
          try {

               const addUser = {
                    firstname: data.firstname,
                    lastname: data.lastname,
                    voter: data.voter,
                    uniqueId: data.uniqueId,
                    password: data.password
               }
               const response = await axios.post('http://localhost:5000/user/auth/signup', addUser, {
                    headers: {
                         "Content-Type": "application/json"
                    }
               })
               if (response.status === 200) {
                    setData({
                         firstname: '',
                         voter: '',
                         uniqueId: '',
                         lastname: '',
                         password: '',
                    })
                    setErr('')
                    // navigate('/')
               }
          } catch (err) {
               setErr(err.message)
          }
     }

     return (
          <div id="signup">
               {err && <h1>{err}</h1>}
               <div className="signup">
                    <div className="signup-heading flex gap-5 flex-col">
                         <p className='text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold'>Register</p>
                         <p className=" flex flex-row gap-5 sm:text-2xl lg:text-3xl xl:text-2xl font-semibold">Already Have an Account?
                              <Link to="/auth/login">
                                   <span className="login">Login</span>
                              </Link>
                         </p>
                    </div>
                    <form className="flex" onSubmit={handleSubmit}>
                         <div className="signup-form grid gap-10 sm:grid-cols-2">
                              <div className="field firstName">
                                   <label className="text-2xl 2xl:text-4xl font-light" htmlFor="firstname">Enter your First Name</label>
                                   <input className="sm:w-3/4 text-sm lg:text-lg xl:text-xl 2xl:text-2xl  font-semibold" name="firstname" id="firstName" type="text" onChange={handleChange} value={data.firstname} required />
                              </div>

                              <div className="field lastName">
                                   <label className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-light" htmlFor="lastname">Enter your Last Name</label>
                                   <input className="sm:w-3/4 text-sm lg:text-lg xl:text-xl 2xl:text-2xl  font-semibold" name="lastname" id="lastName" required type="text" onChange={handleChange} value={data.lastname} />
                              </div>

                              <div className="field uniqueId">
                                   <label className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-light" htmlFor="uniqueId">Enter Aadhar Card Number</label>
                                   <input className="sm:w-3/4 text-sm lg:text-lg xl:text-xl 2xl:text-2xl  font-semibold" name="uniqueId" id="uniqueId" type="text" required maxLength={'12'} onChange={handleChange} value={data.uniqueId} />
                              </div>

                              <div className="field voter">
                                   <label className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-light" htmlFor="voter">Enter your Voter Card Number</label>
                                   <input className="sm:w-3/4 text-sm lg:text-lg xl:text-xl 2xl:text-2xl  font-semibold" name="voter" id="voter" type="text" maxLength={7} required onChange={handleChange} value={data.voter} />
                              </div>


                              <div className="field password">
                                   <label className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-light" htmlFor="password">Create Password </label>
                                   <input className="sm:w-3/4 text-sm lg:text-lg xl:text-xl 2xl:text-2xl  font-semibold" name="password" id="password" required type="password" onChange={handleChange} value={data.password} />
                              </div>
                         </div>
                         <div className="button flex gap-8">
                              <button type="submit" id="button"  className="text-2xl 2xl:text-3xl py-4 2xl:py-10 px-10 2xl:px-24"><span>Register</span></button>

                              <button type="button" id="back" className="text-2xl 2xl:text-3xl py-4 2xl:py-10 px-10 2xl:px-24">
                                   <Link to="/">
                                        <span>Back</span>
                                   </Link>
                              </button>
                         </div>
                    </form>
               </div>
          </div >

     )
}

export default SignUp