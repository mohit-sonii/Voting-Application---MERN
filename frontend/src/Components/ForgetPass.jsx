import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { server } from '../server.js'
import { useNavigate } from 'react-router-dom'
import api from '../axiosInstance.js'
import { userContext } from '../context.js'
import { useSelector } from 'react-redux'

function ForgetPass() {
     
     const { visitorType } = useContext(userContext)
     const userId = useSelector(state => state.userValues.userId)

     const [data, setData] = useState({
          uniqueId: '',
          voterId: ''
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
               const response = await api.post(`${server}/auth/login/forget-password`, data, {
                    headers: {
                         "Content-Type": "application/json",
                    }
               })

               if (response.status === 200) {
                    setData({
                         uniqueId: '',
                         voterId: ''
                    })
                    navigate(`create-new-password/${response.data.data._id}`);
                    setErr('')
               } else {
                    throw new Error("Error while forgeting the password")
               }
          } catch (error) {
               setErr(error.response?.data?.message || 'An error occured while updating the password')
          }
     }
     useEffect(() => {
          const timer = setTimeout(() => {
               setErr('');
          }, 2000);

          return () => clearTimeout(timer);
     }, [err]);

     return (
          <div id="login">
               {err &&
                    <div className="errorField">
                         <p>{err}</p>
                    </div>
               }
               <div className="log">
                    <div className="signup-heading flex gap-5 flex-col">
                         <p className='text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold'>Forget Password ?</p>
                         <p className=" flex flex-row gap-5 sm:text-2xl lg:text-3xl xl:text-2xl font-semibold"> Use your uniqueId and voterId to create new password
                         </p>
                    </div>
                    <form className="flex" onSubmit={handleSubmit}>

                         <div className="signup-form grid gap-10 sm:grid-cols-2">

                              <div className="field uniqueId">
                                   <label className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-light" htmlFor="uniqueId">Enter Aadhar Card Number</label>
                                   <input className="sm:w-3/4 text-sm lg:text-lg xl:text-xl 2xl:text-2xl  font-semibold" name="uniqueId" id="uniqueId" type="text" maxLength={'12'} onChange={handleChange} value={data.uniqueId} required />
                              </div>

                              <div className="field voterId">
                                   <label className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-light" htmlFor="voterId">Enter Voter Id Number </label>
                                   <input className="sm:w-3/4 text-sm lg:text-lg xl:text-xl 2xl:text-2xl  font-semibold" name="voterId" id="voterId" type="text" onChange={handleChange} value={data.voterId} required />
                              </div>
                         </div>
                         <div className="button flex gap-8">
                              <button type="submit" id="button" className="text-2xl 2xl:text-3xl py-4 2xl:py-10 px-10 2xl:px-24"><span>Check for my Account</span></button>

                              <button type="button" id="back" className="text-2xl 2xl:text-3xl py-4 2xl:py-10 px-10 2xl:px-24">
                                   {visitorType !== '' ?
                                        <Link to={`/${userId}/api/v1/user/profile`}>
                                             <span>Back</span>
                                        </Link>
                                        :
                                        <Link to={`/api/v1/auth/login`}>
                                             <span>Back</span>
                                        </Link>

                                   }
                              </button>
                         </div>
                    </form>
               </div>
          </div>
     )
}

export default ForgetPass