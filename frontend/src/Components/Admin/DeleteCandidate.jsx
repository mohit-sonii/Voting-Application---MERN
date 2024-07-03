
import React, { useContext, useEffect, useState } from 'react'
import CandidateCard from '../CandidateCard'
import api from '../../axiosInstance'
import { server } from '../../server'
import { Link, useParams } from 'react-router-dom'
import "../../Styles/CandidateList.css"
import { userContext } from '../../context'

function DeleteCandidate() {

     const { visitorType } = useContext(userContext)
     const [err, setErr] = useState('')
     const { id } = useParams()
     const [candidate, setCandidate] = useState('')

     useEffect(() => {
          getCandidateList()
     }, [])
     const getCandidateList = async () => {
          try {

               const token = localStorage.getItem('accessToken')
               const response = await api.get(`${server}/candidates/candidate-list`, {
                    headers: {
                         Authorization: `Bearer ${token}`
                    },
               })
               setCandidate(response.data.data)
          } catch (err) {
               setErr(err.message)
          }
     }


     const handleClick = async (id) => {
          window.confirm('Are you sure to delete this candidate. This action is irreversable')
          if (!confirm) return
          const token = localStorage.getItem('accessToken')
          await api.delete(`${server}/candidates/candidate-list/${id}`, {
               headers: {
                    Authorization: `Bearer ${token}`
               }
          })
     }

     useEffect(() => {
          const timer = setTimeout(() => {
               setErr('');
          }, 2000);

          return () => clearTimeout(timer);
     }, [err]);

     return (
          <div className="candidateList flex flex-col ">
               {err &&
                    <div className="errorField">
                         <p>{err}</p>
                    </div>
               }

               <div className="heading-candidate flex  justify-between flex-col gap-5">
                    <div className="backButton">
                         <button type="button" id="back" className="text-2xl 2xl:text-3xl py-4 2xl:py-10 px-10     2xl:px-24">
                              <Link to={`/admin/${id}`} state={{ visitorType }}>
                                   <span>&lt; Back</span>
                              </Link>
                         </button>
                    </div>
               </div>
               <div className="listItems grid gap-[80px] sm:grid-cols-3 grid-cols-2">
                    {candidate.length <= 0 && 'No Candidates are Registered Yet'}
                    {candidate.length > 0 && candidate.map((_, index) => (
                         <div className="cardContainer" key={candidate[index]._id}>
                              <CandidateCard partyName={candidate[index].partyName} candidateImage={candidate[index].avatar} candidateName={`${candidate[index].firstName} ${candidate[index].lastName}`} onClick={() => handleClick(candidate[index]._id)} />
                         </div>
                    ))}
               </div>

          </div >
     )
}

export default DeleteCandidate


