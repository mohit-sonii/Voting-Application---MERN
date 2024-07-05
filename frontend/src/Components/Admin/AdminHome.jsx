import React, { useContext, useState } from 'react'
import Button from '../Button'
import "../../Styles/AdminHome.css"
import api from '../../axiosInstance'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { server } from '../../server'
import { userContext } from '../../context'
import { useDispatch } from 'react-redux'
import { setUserId } from "../../Redux/slicer.js"

function AdminHome() {
     const [err, setErr] = useState('')
     const {updateVisitorId} = useContext(userContext)
     const {changeVisitorType} = useContext(userContext)
     const dispatch=useDispatch()
     const navigate = useNavigate()
     const handleClick = async () => {
          try {
               const token = localStorage.getItem('accessToken')
               const response = await api.post(`${server}/auth/logout`, null, {
                    headers: {
                         Authorization: `Bearer ${token}`
                    }
               })
               if (response.status === 200) {
                    localStorage.removeItem('accessToken')
                    updateVisitorId('')
                    changeVisitorType('')
                    dispatch(setUserId(''))
                    navigate('/')

               }

          } catch (err) {
               console.log(err.message)
               setErr(err.response?.data?.message ||  err.message || 'Sorry for inconvenience, I am trying to resolve the issue')

          }
     }

     useEffect(() => {
          const timer = setTimeout(() => {
               setErr('');
          }, 2000);

          return () => clearTimeout(timer);
     }, [err]);

     return (
          <div className="main-container-for-admin-home h-screen flex">
               {err &&
                    <div className="errorField">
                         <p>{err}</p>
                    </div>
               }
               <div className="admin-home flex gap-20 h-screen flex-col">
                    <div className="logout-admin ">
                         <Button innerText={'Logout'} onClick={handleClick} />
                    </div>
                    <div className="admin-headings flex flex-col gap-10">
                         <p className="heading admin-heading font-extrabold text-5xl md:text-6xl lg:text-7xl">Welcome, Mohit Soni ~ It's been a while</p>
                         <p className="admin-subheading  text-2xl md:text-3xl lg:text-4xl">What you are planning to do?</p>
                    </div>
                    <div className="admin-functionalities flex gap-10">
                         <Button innerText={'Add a Candidate'} link={'add-candidate'} />
                         <Button innerText={'Remove a Candidate'} link={'delete-candidate'} />
                         <Button innerText={'Update a Candidate'} link={'update-candidate'} />
                         <Button innerText={'View Vote Counts'} />
                         <Button innerText={'View Vote Counts'} />
                    </div>
               </div>
          </div>
     )
}

export default AdminHome