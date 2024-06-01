
import "../Styles/SignUp.css"
import { useState } from "react"
import React from 'react'
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"


function SignUp() {
     // state to store data field
     const [data, setData] = useState({
          firstname: '',
          lastname: '',
          voter: '',
          uniqueId: '',
          password: ''
     })
     // error state in case of any error encourntered
     const [err, setErr] = useState('')
     // nvaigate to naviage the user 
     const navigate = useNavigate()
     // change for updataino in input fields
     const handleChange = (e) => {
          const { name, value } = e.target;
          setData({ ...data, [name]: value })
     }
     // to subkit the data
     const handleSubmit = async (e) => {
          e.preventDefault();
          try {
               // to add the user data from the fileds
               const addUser = {
                    firstname: data.firstname,
                    lastname: data.lastname,
                    voter: data.voter,
                    uniqueId: data.uniqueId,
                    password: data.password
               }
               // POST request to add user in the server
               const res = await fetch('http://localhost:5000/user/auth/signup', {
                    method: "POST",
                    body: JSON.stringify(addUser),
                    headers: {
                         "Content-Type": "application/json"
                    }
               })
               const response = await res.json()
               console.log(response)
               if (response.status === 200) {
                    setData({
                         firstname: '',
                         voter: '',
                         uniqueId: '',
                         lastname: '',
                         password: '',
                    })
                    // to get the token and the user detail from the fetched response
                    const { token, user } = response;

                    // Store the token in localStorage
                    localStorage.setItem('token', token);

                    console.log('User signed up:', user);
                    console.log('toke', token)
                    // just to ensure that the token is generating
                    // setErr(response.data.token)

                    // Navigate to the home route
                    // navigate('/')
               }
               else {
                    setErr(response.message)
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
                              <Link to="/user/auth/login">
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
                              <button type="submit" id="button" className="text-2xl 2xl:text-3xl py-4 2xl:py-10 px-10 2xl:px-24"><span>Register</span></button>

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