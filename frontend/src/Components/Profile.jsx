

import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom'

function Profile() {
     const { id } = useParams()
     const [err, setErr] = useState('')
     const [userName, setName] = useState('')
     const [voter, setVoter] = useState('')
     const [uniqueId, setUnique] = useState('')
     const [isVoted] = useState('')
     const [vote, setVoted] = useState('')
     const navigate = useNavigate()
     useEffect(() => {
          const fetching = async () => {
               
               try {
                    const response = await axios.get(`/user/profile/${id}`, {
                         headers: { Authorization: `Bearer ${token}` }
                    })
                    const result = response.data
                    setName([result.firstname + " " + result.lastname])
                    setVoter(result.voter)
                    setUnique(result.uniqueId)
                    setVoted(result.isVoted ? 'You already have voted' : `You haven't voted yet`);
               } catch (err) {
                    setErr(err.message)
               }
          }
          fetching();
     }, [id])

     const handleLogout = () => {
          navigate('/')
          logout()
     }

     return (
          <div id="login">
               {err && <h1 className="text-xl">{err}</h1>}
               <div className="log">
                    <div className="signup-heading flex gap-5">
                         <p className='text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold'>Profile</p>
                    </div>
                    <form className="flex">

                         <div className="signup-form grid gap-10  ">
                              <div className="field name">
                                   <label className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-light" htmlFor="fullname"> Full Name</label>
                                   <input className="sm:w-3/4 text-sm lg:text-lg xl:text-xl 2xl:text-2xl  font-semibold" name="fulname" id="fullname" type="text" value={userName} disabled />
                              </div>
                              <div className="field uniqueId">
                                   <label className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-light" htmlFor="uniqueId"> Aadhar Card Number</label>
                                   <input className="sm:w-3/4 text-sm lg:text-lg xl:text-xl 2xl:text-2xl  font-semibold" name="uniqueId" id="uniqueId" type="text" value={uniqueId} disabled />
                              </div>
                              <div className="field voter">
                                   <label className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-light" htmlFor="uniqueId"> Voter Card Number</label>
                                   <input className="sm:w-3/4 text-sm lg:text-lg xl:text-xl 2xl:text-2xl  font-semibold" name="uniqueId" id="uniqueId" type="text" value={voter} disabled />
                              </div>
                              <div className="field voted">
                                   <label className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-light" htmlFor="uniqueId"> Voted </label>
                                   <input className="sm:w-3/4 text-sm lg:text-lg xl:text-xl 2xl:text-2xl  font-semibold" name="uniqueId" id="uniqueId" type="text" value={vote} disabled />
                              </div>
                              <div className="field password">
                                   <label className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-light" htmlFor="password"> Password </label>
                                   <p className="text-sm sm:text-xl cursor-pointer forget-password ">
                                        <Link to="/user/auth/forget-password">
                                             Update Password?
                                        </Link>
                                   </p>
                              </div>
                         </div>
                         <div className="button flex gap-8">
                              {!isVoted && <button type="button" id="button" className="text-2xl 2xl:text-3xl py-4 2xl:py-10 px-10 2xl:px-24">
                                   <Link to="/vote">
                                        <span>Vote Now</span>
                                   </Link>
                              </button>
                              }
                              <button type="button" id="back" className="text-2xl 2xl:text-3xl py-4 2xl:py-10 px-10 2xl:px-24">
                                   <Link to="/">
                                        <span>Back</span>
                                   </Link>
                              </button>
                              <button type="button" id="back" className="text-2xl 2xl:text-3xl py-4 2xl:py-10 px-10 2xl:px-24" onClick={handleLogout}>
                                   <span>Log out</span>
                              </button>
                         </div>
                    </form>
               </div>
          </div>
     )
}

export default Profile