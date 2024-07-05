import { Link } from 'react-router-dom'
import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import "../Styles/Profile.css"
import { server } from '../server'
import { serverWithId } from '../server'
import axios from 'axios'
import api from "../axiosInstance"
import { userContext } from '../context'
import Button from './Button'

function Profile() {
   const userId = useSelector(state => state.userValues.userId)
   const [user, setUserData] = useState({})
   const [err, setErr] = useState('')
   const { updateUserData } = useContext(userContext)
   const { visitorType } = useContext(userContext)

   useEffect(() => {
      getUserDetails()
   }, [])

   const getUserDetails = async () => {
      try {
         const token = localStorage.getItem('accessToken')
         const response = await axios.get(`${serverWithId}/${userId}/api/v1/user/profile`, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         })
         if (!response) throw new Error('Error while fethcing the user details')
         setUserData(response.data.data)
         updateUserData(response.data.data)
      } catch (err) {
         console.log(err,err.message)
         setErr(err.response?.data?.message || err.message || 'Please Login again to see the credentials')
      }
   }

   useEffect(() => {
      const timer = setTimeout(() => {
         setErr('');
      }, 2000);
      return () => clearTimeout(timer);
   }, [err]);

   return (
      <>
         {err &&
            <div className="errorField">
               <p>{err}</p>
            </div>
         }
         <div className="user-profile">
            <div className="header">
               <button type="button" id="back" className="text-2xl 2xl:text-3xl py-4 2xl:py-10 px-10 2xl:px-24">
                  <Link to={`/${userId}`} state={visitorType}>
                     <span>&lt; Back</span>
                  </Link>
               </button>
               <Button innerText="Update Profile" link={`update`} />
            </div>
            <div className="profile-details">
               {user.avatar ?
                  <img src={user.avatar} alt="User Avatar" className="avatar" />
                  : <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkVto1t4ROcxcqi0SrFtgSQQJ1Aau0ad1d3g&s" alt="No Avatar" className="avatar" />
               }
               <div className="info">
                  <p className='text-[#161515] text-2xl md:text-xl lg:text-2xl'><strong>First Name:</strong> {user.firstName}</p>
                  <p className='text-[#161515] text-2xl md:text-xl lg:text-2xl'><strong>Last Name:</strong> {user.lastName}</p>
                  <p className='text-[#161515] text-2xl md:text-xl lg:text-2xl'><strong>Password:</strong> •••••••</p>
                  <p className='text-[#161515] text-2xl md:text-xl lg:text-2xl'><strong>Unique ID:</strong> {user.uniqueId}</p>
                  <p className='text-[#161515] text-2xl md:text-xl lg:text-2xl'><strong>Voter ID:</strong> {user.voterId}</p>
                  <p className='text-[#161515] text-2xl md:text-xl lg:text-2xl'><strong>Voted:</strong> {user.isVoted ? "Yes" : "No"}</p>
               </div>
            </div>
         </div>
      </>
   )
}

export default Profile