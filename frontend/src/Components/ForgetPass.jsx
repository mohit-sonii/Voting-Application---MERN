import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function ForgetPass() {


     const [data, setData] = useState({
          uniqueId: '',
          voter: ''
     })
     const [err, setErr] = useState('')
     const handleChange = (e) => {
          const { name, value } = e.target;
          setData({ ...data, [name]: value })
     }
     const navigate = useNavigate()
     const handleSubmit = async (e) => {

          e.preventDefault();
          try {
               const user = {
                    uniqueId: data.uniqueId,
                    voter: data.voter
               }
               const response = await axios.post('/user/auth/forget-password', user, {
                    headers: {
                         "Content-Type": "application/json",
                    }
               })
               if (response.data.redirectUrl) {
                    navigate(response.data.redirectUrl);
               } else {
                    setErr('Error: User not found');
               }
               if (response.status === 200) {
                    setData({
                         uniqueId: '',
                         voter: ''
                    })
                    setErr('')
               } else {
                    setErr('User does not exists')
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
                         <p className='text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold'>Forget Password ?</p>
                         <p className=" flex flex-row gap-5 sm:text-2xl lg:text-3xl xl:text-2xl font-semibold"> Use your uniqueId and voter Id to create new password
                         </p>
                    </div>
                    <form className="flex" onSubmit={handleSubmit}>

                         <div className="signup-form grid gap-10 sm:grid-cols-2">

                              <div className="field uniqueId">
                                   <label className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-light" htmlFor="uniqueId">Enter Aadhar Card Number</label>
                                   <input className="sm:w-3/4 text-sm lg:text-lg xl:text-xl 2xl:text-2xl  font-semibold" name="uniqueId" id="uniqueId" type="text" maxLength={'12'} onChange={handleChange} value={data.uniqueId} required />
                              </div>

                              <div className="field voter">
                                   <label className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-light" htmlFor="voter">Enter Voter Id Number </label>
                                   <input className="sm:w-3/4 text-sm lg:text-lg xl:text-xl 2xl:text-2xl  font-semibold" name="voter" id="voter" type="text" onChange={handleChange} value={data.voter} required />
                              </div>
                         </div>
                         <div className="button flex gap-8">
                              <button type="submit" id="button" className="text-2xl 2xl:text-3xl py-4 2xl:py-10 px-10 2xl:px-24"><span>Check for my Account</span></button>

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

export default ForgetPass