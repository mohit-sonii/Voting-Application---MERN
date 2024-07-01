

import React, { useState, useEffect, useContext } from 'react'
import api from '../axiosInstance'
import { useSelector } from 'react-redux'
import "../Styles/updatePassword.css"
import { server, serverWithId } from '../server'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../context'

function UpdatePassword() {

     const userId = useSelector(state => state.userValues.userId)
     const [updates, setUpdates] = useState({
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: ''
     })
     const [err, setErr] = useState('')
     const { visitorType } = useContext(userContext)
     const navigate = useNavigate()
     const [success, setSuccess] = useState('')

     const handleChange = (e) => {
          const { value, name } = e.target
          setUpdates({ ...updates, [name]: value })
     }

     const handleSubmit = async (e) => {
          e.preventDefault()
          if (updates.newPassword && updates.confirmNewPassword < 6) {
               alert('Password should atleast of 6 character')
               return
          }
          try {
               const token = localStorage.getItem('accessToken')
               const response = await api.patch(`${serverWithId}/${userId}/api/v1/user/profile/update/password`, updates, {
                    headers: {
                         Authorization: `Bearer ${token}`
                    }
               })
               if (!response) throw new Error('The server is not running properly')
               setSuccess('Password Updated Successfully')

          } catch (err) {
               setErr(err.response?.data?.message || 'Sorry for inconvenience, I am working to resolve this issue')
          }
     }

     useEffect(() => {
          if (success !== '') {
               const timer = setTimeout(() => {
                    navigate(`/${userId}/api/v1/user/profile/update`);
               }, 2000);
               return () => clearTimeout(timer);
          }
     }, [success]);

     useEffect(() => {
          const timer = setTimeout(() => {
               setErr('');
               setSuccess('')
          }, 2000);
          return () => clearTimeout(timer);
     }, [err, success]);

     return (
          <>
               {success &&
                    <div className="errorField greenField">
                         <p>{success}</p>
                    </div>
               }
               <div className="formSection mt-10">

                    <div className="form-headings">
                         <p className=' text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold text-left'>Update Password</p>
                    </div>
                    <form className="flex w-full sm:w-[50%] flex-col gap-10  justify-between" onSubmit={handleSubmit} >
                         <div className="formData flex flex-col gap-10">
                              <div className="ele currentPassword flex flex-col gap-3">
                                   <label htmlFor="currentPassword" className="text-lg lg:text-xl xl:text-2xl">Old Password</label>
                                   <input
                                        className="text-lg lg:text-xl xl:text-2xl"
                                        type="password"
                                        name="currentPassword"
                                        id="currentPassword"
                                        required
                                        onChange={handleChange}
                                        value={updates.currentPassword}

                                   />
                              </div>
                              <div className="ele newPassword flex flex-col gap-3">
                                   <label htmlFor="newPassword" className="text-lg lg:text-xl xl:text-2xl">New Password</label>
                                   <input
                                        className="text-lg lg:text-xl xl:text-2xl"
                                        type="password"
                                        name="newPassword"
                                        id="newPassword"
                                        required
                                        onChange={handleChange}
                                        value={updates.newPassword}

                                   />
                              </div>
                              <div className="ele confirmNewPassword flex flex-col gap-3">
                                   <label htmlFor="confirmNewPassword" className="text-lg lg:text-xl xl:text-2xl">Confirm New Password</label>
                                   <input
                                        className="text-lg lg:text-xl xl:text-2xl"
                                        type="password"
                                        name="confirmNewPassword"
                                        required
                                        id="confirmNewPassword"
                                        onChange={handleChange}
                                        value={updates.confirmNewPassword}
                                   />
                              </div>
                         </div>
                         <div className="button flex gap-6">
                              <button type="button" id="back" className="text-2xl 2xl:text-3xl py-4 2xl:py-10 px-10 2xl:px-24">
                                   <Link to={`/${userId}/api/v1/user/profile/update`} state={visitorType}>
                                        <span>&lt; Back</span>
                                   </Link>
                              </button>
                              <button
                                   type="submit"
                                   id="button"
                                   className={`text-2xl 2xl:text-3xl py-4 2xl:py-10 px-10 2xl:px-24 ${Object.keys(updates).length === 0 ? 'disabled' : ''}`}
                                   disabled={Object.keys(updates).length === 0}
                              >
                                   <span>Update Password</span>
                              </button>
                              <button type="button"  className="text-2xl 2xl:text-3xl py-4 2xl:py-10 px-10 2xl:px-24">
                                   <Link to={'/api/v1/auth/login/forget-password'}>
                                        <span style={{color:'blueviolet'}}><strong>Forget Password</strong></span>
                                   </Link>
                              </button>
                         </div>
                    </form>
               </div>
          </>
     )
}


export default UpdatePassword