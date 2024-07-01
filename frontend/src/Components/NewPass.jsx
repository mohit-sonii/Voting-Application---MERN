

import { Link, useParams } from 'react-router-dom'
import api from '../axiosInstance'
import { server } from '../server'
import React, { useContext } from 'react'
import { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import { userContext } from '../context'
import { useSelector } from 'react-redux'

function NewPass() {
     const { visitorType } = useContext(userContext)
     const userId = useSelector(state => state.userValues.userId)
     const { id } = useParams()
     const [data, setData] = useState({
          password: '',
          repass: ''
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
               if (data.password === data.repass) {
                    const response = await api.patch(`${server}/auth/login/forget-password/create-new-password/${id}`, { password: data.password }, {
                         headers: {
                              "Content-Type": "application/json"
                         }
                    });
                    if (response.status === 200) {
                         data.password = ''
                         data.repass = ''
                         navigate('/api/v1/auth/login')
                    }
               }
               else {
                    throw new Error("Password mismatch")
               }
          } catch (error) {
               setErr(error.response?.data?.message || 'An error occured while resetting the password')
          }
     };
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
                         <p className='text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold'>Create  New Password :</p>
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

export default NewPass