

import { Link, useParams } from 'react-router-dom'
// Link is for Routing
// useParams is for taking Id from the URL
import React from 'react'
import { useState } from 'react'

function NewPass() {

     // it will take the ID from the URL
     const { id } = useParams()
     // state that upates the password
     const [data, setData] = useState({
          password: '',
          repass: ''
     })
     // error state in case of any error while routing or posting
     const [err, setErr] = useState('')

     const handleChange = (e) => {
          const { name, value } = e.target;
          setData({ ...data, [name]: value })
     }
     const handleSubmit = async (e) => {
          e.preventDefault();

          if (data.password === data.repass) {

               try {
                    // it will take the password form the data state
                    const pass = {
                         password: data.password
                    }
                    // using fetch to update the password
                    const response = await fetch(`http://localhost:5000/user/auth/forget-password/create-new-password/${id}`, {
                         method: "PATCH",
                         body: JSON.stringify(pass),
                         headers: {
                              "Content-Type": "application/json"
                         }
                    });
                    const result = await response.json()
                    console.log('Password updated:', result);
               } catch (err) {
                    setErr(err.message);
               }
          }
          else{
               setErr('Password should match')
          }
     };

     return (
          <div id="login">
               {err && <h1 className="text-xl">{err}</h1>}
               <div className="log">
                    <div className="signup-heading flex gap-5 flex-col">
                         <p className='text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold'>Create New Password ?</p>
                    </div>
                    <form className="flex" onSubmit={handleSubmit}>

                         <div className="signup-form grid gap-10 sm:grid-cols-2">

                              <div className="field password">
                                   <label className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-light" htmlFor="password">Create Password</label>
                                   <input className="sm:w-3/4 text-sm lg:text-lg xl:text-xl 2xl:text-2xl  font-semibold" name="password" id="pass" type="password" onChange={handleChange} value={data.password} required />
                              </div>

                              <div className="field pass-check">
                                   <label className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-light" htmlFor="repass">Re-Enter your Password </label>
                                   <input className="sm:w-3/4 text-sm lg:text-lg xl:text-xl 2xl:text-2xl  font-semibold" name="repass" id="repass" type="password" onChange={handleChange} value={data.repass} required />
                              </div>
                         </div>
                         <div className="button flex gap-8">
                              <button type="submit" id="button" className="text-2xl 2xl:text-3xl py-4 2xl:py-10 px-10 2xl:px-24"><span>Change Password</span></button>

                              <button type="button" id="back" className="text-2xl 2xl:text-3xl py-4 2xl:py-10 px-10 2xl:px-24">
                                   <Link to="/user/auth/login">
                                        <span>Back</span>
                                   </Link>
                              </button>
                         </div>
                    </form>
               </div>
          </div>
     )
}

export default NewPass