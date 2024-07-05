import React, { useContext, useEffect, useState } from 'react'
import "../Styles/SpecificCandidate.css"
import Button from "./Button"
import api from '../axiosInstance'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { candidateContext, userContext } from '../context'
import { server, serverWithId } from '../server'
import { toogleVoted, setUserId } from '../Redux/slicer'

function SpecificCandidate() {
   const { candidateId } = useContext(candidateContext)
   const { visitorId, visitorType } = useContext(userContext)
   const [err, setErr] = useState('')
   const dispatch = useDispatch()
   const [voteResponse, setVoteResponse] = useState('')
   const isVoted = useSelector(state => state.userValues.voted)
   const [candidateData, setCandidateData] = useState({})
   const [newDate, setDate] = useState('')

   useEffect(() => {
      getSpecificCandidateDetails()
   }, [])

   const getSpecificCandidateDetails = async () => {
      try {
         const response = await api.get(`${server}/candidates/candidate-list/${candidateId}`)
         const date = new Date(response.data.data.dob)
         const formattedDateLocal = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
         });
         setCandidateData(response.data.data)
         setDate(formattedDateLocal)
      } catch (error) {
         setErr(error.response?.data?.message || 'Please Login again to visit this route')
      }
   }

   const performVote = async () => {
      try {
         const token = localStorage.getItem('accessToken')
         const response = await axios.post(`${server}/candidates/candidate-list/${candidateId}`, { candidateId }, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         })
         setVoteResponse(response.data.message)
      } catch (err) {
         setErr(err.response?.data?.message || 'Please Login again to perform Voting')
      }
   }

   const handleClick = () => {
      performVote()
      dispatch(toogleVoted())
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
         <div className="parent-container-candidate m-auto mt-5  mb-16 h-max flex w-[90%] ">
            <button type="button" id="back" className="text-2xl 2xl:text-3xl py-4 2xl:py-10 px-10 2xl:px-24">
               <Link to={`/${visitorId}/api/v1/candidates/candidate-list`} state={visitorType}>
                  <span>&lt; Back</span>
               </Link>
            </button>
            <div className="main-candidate-container flex-col flex gap-20 p-8 w-full">
               <div className="section-0 flex">
                  <p className='text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold'>{`${candidateData.firstName} ${candidateData.lastName}`}</p>
               </div>
               <div className="section-1  grid sm:grid-cols-3 gap-6 ">
                  <div className="candidate-avatar w-[200px] h-[200px]">
                     <img src={`${candidateData.avatar}`} alt="candidate-image" className='w-full h-full' />
                  </div>
                  <div className="candidate-basic justify-center text-left flex gap-3 flex-col">
                     <p className="subheading text-2xl md:text-xl lg:text-2xl">
                        {`Fullname: `}
                        <strong>
                           {candidateData.firstName} {candidateData.lastName}
                        </strong>
                     </p>
                     <p className="subheading text-2xl md:text-xl lg:text-2xl">
                        {`Representative: `}
                        <strong>
                           {candidateData.representative}
                        </strong>
                     </p>
                     <p className="subheading text-2xl md:text-xl lg:text-2xl">
                        {`Date of Birth: `}
                        <strong>
                           {newDate}
                        </strong>
                     </p>
                     <p className="subheading text-2xl md:text-xl lg:text-2xl">
                        {`Candidate: `}
                        <strong>
                           {candidateData.candidateType}
                        </strong>
                     </p>
                     <p className="subheading text-2xl md:text-xl lg:text-2xl">
                        {`Belongs To: `}
                        <strong>
                           {candidateData.town}
                        </strong>
                     </p>
                  </div>
                  {!isVoted ?
                     <div className="vote-button  flex justify-center items-center" >
                        <Button innerText="Vote This Candidate" disabled={isVoted} onClick={handleClick} />
                     </div>
                     : err !== ''
                        ? <div className="errorField ">
                           <p>User Already Voted!!</p>
                        </div>
                        : <div className="greenField">
                           <p>Thanks for voting!!</p>
                        </div>
                  }
               </div>
               <div className="section-2 flex  gap-10 flex-col">
                  <p className='text-2xl md:text-3xl lg:text-4xl  font-medium'>Promises</p>
                  <div className="promises p-4">
                     {candidateData.promise && candidateData.promise.map((item, index) => (
                        <div className="promiseList" key={index}>
                           <p className='text-xl md:text-2xl lg:text-3xl '>`~  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis corporis quis cupiditate {item} similique magni rem voluptates aliquid saepe! Sint sequi culpa rerum fugit error vel sapiente! In, aut adipisci. Voluptas? `</p>
                           <br />
                           <p className='text-xl md:text-2xl lg:text-3xl '>`~  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis corporis quis cupiditate similique {item} magni rem voluptates aliquid saepe! Sint sequi culpa rerum fugit error vel sapiente! In, aut adipisci. Voluptas?`</p>
                           <br />
                           <p className='text-xl md:text-2xl lg:text-3xl '>`~  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis corporis quis cupiditate {item} similique magni rem voluptates aliquid saepe! Sint sequi culpa rerum fugit error vel sapiente! In, aut adipisci. Voluptas? `</p>
                           <br />
                           <p className='text-xl md:text-2xl lg:text-3xl '>`~  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis corporis quis cupiditate similique {item} magni rem voluptates aliquid saepe! Sint sequi culpa rerum fugit error vel sapiente! In, aut adipisci. Voluptas?`</p>
                           <br />
                           <p className='text-xl md:text-2xl lg:text-3xl '>`~  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis corporis quis cupiditate {item} similique magni rem voluptates aliquid saepe! Sint sequi culpa rerum fugit error vel sapiente! In, aut adipisci. Voluptas? `</p>
                           <br />
                           <p className='text-xl md:text-2xl lg:text-3xl '>`~  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis corporis quis cupiditate similique {item} magni rem voluptates aliquid saepe! Sint sequi culpa rerum fugit error vel sapiente! In, aut adipisci. Voluptas?`</p>

                        </div>
                     ))}

                  </div>

               </div>
            </div>
         </div >


      </>
   )
}

export default SpecificCandidate