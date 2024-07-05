import React, { useState, useEffect } from 'react'
import "../../Styles/AddCandidate.css"
import axios from 'axios'
import { server } from '../../server'
import api from '../../axiosInstance'

function AddCandidate() {
   const [states, setState] = useState([])
   const [apiAreas, setArea] = useState([])
   const [data, setData] = useState({
      firstName: '',
      lastName: '',
      avatar: '',
      voterId: '',
      uniqueId: '',
      town: '',
      representative: '',
      candidateType: '',
      dob: '',
      promise: '',
   })
   async function getAreaDetail() {
      try {
         const response = await axios.get(`${server}/api/districts-and-states/district-state`)
         const areas = response.data.data?.[0]?.apiData?.states
         setArea(areas)
      } catch (err) {
         alert(err.response?.data?.message || err.message || 'An error occured while sending your query')
      }
   }

   useEffect(() => {
      getAreaDetail()
   }, [])

   useEffect(() => {
      if (apiAreas.length > 0) {
         getState()
      }
   }, [apiAreas])

   const getState = async () => {
      try {
         const res = apiAreas.map((item) => item.state)
         setState(res)
      } catch (error) {
         alert(err.response?.data?.message || err.message || 'An error occured while talking with database')
      }
   };

   const handleChange = (e) => {
      const { name, value } = e.target
      if (name === "avatar") {
         setData({ ...data, avatar: e.target.files[0] });
      } else {
         setData({ ...data, [name]: value })
      }
   }
   const handleSubmit = async (e) => {
      e.preventDefault()
      try {
         const token = localStorage.getItem('accessToken')
         console.log(data, 'this is for mdata')
         const response = await axios.post(`${server}/candidates/candidate-list`, data, {
            headers: {
               Authorization: `Bearer ${token}`,
               "Content-Type": "multipart/form-data"
            }
         })
         if (!response) console.log(response)
         console.log(response.data)
         setData(Object.keys(initialData).reduce((acc, key) => {
            acc[key] = '';
            return acc;
         }, {}))
      } catch (err) {
         console.log(err, err.message)
      }
   }
   return (
      <form className="flex admin-add-candidate" onSubmit={handleSubmit} >
         <div className="add-candidate-entries  flex flex-col gap-10  justify-between">
            <div className="add-candidate-formData flex  justify-between gap-10">
               <div className="ele firstName  flex-col flex gap-3">
                  <label htmlFor="firstName" className="text-lg lg:text-xl xl:text-2xl">First Name</label>
                  <input
                     className="text-lg lg:text-xl xl:text-2xl"
                     type="text"
                     name="firstName"
                     id="firstName"
                     required
                     onChange={handleChange}
                     value={data.firstName}
                  />
               </div>
               <div className="ele lastname flex flex-col gap-3">
                  <label htmlFor="lastName" className="text-lg lg:text-xl xl:text-2xl">Last Name</label>
                  <input
                     className="text-lg lg:text-xl xl:text-2xl"
                     type="text"
                     name="lastName"
                     id="lastName"
                     required
                     onChange={handleChange}
                     value={data.lastName}
                  />
               </div>
               <div className="ele uniqueId flex flex-col gap-3">
                  <label htmlFor="uniqueId" className="text-lg lg:text-xl xl:text-2xl">Aadhar card Number</label>
                  <input
                     className="text-lg lg:text-xl xl:text-2xl"
                     type="number"
                     name="uniqueId"
                     required
                     id="uniqueId"
                     onChange={handleChange}
                     value={data.uniqueId}

                  />
               </div>
               <div className="ele voterId flex flex-col gap-3">
                  <label htmlFor="voterId" className="text-lg lg:text-xl xl:text-2xl">Voter Card Id</label>
                  <input
                     className="text-lg lg:text-xl xl:text-2xl"
                     type="text"
                     name="voterId"
                     required
                     id="voterId"
                     onChange={handleChange}
                     value={data.voterId}
                  />
               </div>
               <div className="ele representative flex flex-col gap-3">
                  <label htmlFor="representative" className="text-lg lg:text-xl xl:text-2xl">Representative of </label>
                  <input
                     className="text-lg lg:text-xl xl:text-2xl"
                     type="text"
                     name="representative"
                     onChange={handleChange}
                     required
                     id="representative"
                     value={data.representative}
                  />
               </div>
               <div className="ele town flex flex-col gap-3">
                  <label htmlFor="town" className="text-lg lg:text-xl xl:text-2xl">Lives in</label>
                  <select name="town" id="town" required className="text-lg lg:text-xl xl:text-2xl" onChange={handleChange} >
                     <option value="">Select State</option>
                     {states && states.length > 0 && states.map((ele, index) => (
                        <option key={index} value={ele.state}>{ele}</option>
                     ))}
                  </select>
               </div>
               <div className="ele candidateType flex flex-col gap-3">
                  <label htmlFor="lastName" className="text-lg lg:text-xl xl:text-2xl">Candidate Type</label>
                  <select required className="text-lg lg:text-xl xl:text-2xl" id="candidateType" name="candidateType" onChange={handleChange}>
                     <option value="">Select Candidate Type</option>
                     <option value="new">New</option>
                     <option value="existing">Existing</option>
                  </select>
               </div>
               <div className="ele dob flex flex-col gap-3">
                  <label htmlFor="dob" className="text-lg lg:text-xl xl:text-2xl">Date of Birth</label>
                  <input
                     className="text-lg lg:text-xl xl:text-2xl"
                     type="date"
                     name="dob"
                     required
                     id="dob"
                     onChange={handleChange}
                     value={data.dob}
                  />
               </div>
               <div className="field ">
                  <label className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-light" htmlFor="avatar">Upload Avatar</label>
                  <input className="text-sm lg:text-lg xl:text-xl 2xl:text-2xl  font-semibold" id="avatar" name="avatar" type="file" onChange={handleChange} required />
               </div>
            </div>
            <div className="ele promise w-[90%] flex flex-col gap-3">
               <label htmlFor="promise" className="text-lg lg:text-xl xl:text-2xl">Promises</label>
               <textarea value={data.promise} placeholder="Enter Promises" name="promise" id="promise" onChange={handleChange} className="textarea text-lg xl:text-xl" required></textarea>
            </div>
            <div className="button">
               <button type="submit" id="button" className="text-2xl 2xl:text-3xl py-4 2xl:py-10 px-10 2xl:px-24"><span>Add Candidate</span></button>
            </div>
         </div>
      </form >
   )
}

export default AddCandidate