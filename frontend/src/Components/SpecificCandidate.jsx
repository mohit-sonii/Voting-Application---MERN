import React, { useContext, useEffect, useState } from 'react'
import "../Styles/SpecificCandidate.css"
import api from '../axiosInstance'
import { candidateContext } from '../context'
function SpecificCandidate() {
     const { candidateId } = useContext(candidateContext)
     const [err, setErr] = useState('')

     useEffect(() => {
          getSpecificCandidateDetails()
     }, [])

     const getSpecificCandidateDetails = async () => {
          try {
               const response = await api.get(`api/v1/candidates/candidate-list/${candidateId}`)
               if(response) throw new Error('Errrrrrrrr')
          } catch (error) {
               setErr(error.response?.data?.message || 'An error occured while using this route')
          }
     }
     useEffect(() => {
          const timer = setTimeout(() => {
               setErr('');
          }, 2000);

          return () => clearTimeout(timer); // Clear the timeout if the component unmounts or dependencies change
     }, [err]);
     return (
          <div>SpecificCandidate</div>
     )
}

export default SpecificCandidate