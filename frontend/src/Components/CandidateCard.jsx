
import React, { useContext } from 'react'
import "../Styles/CandidateCard.css"
import Button from './Button'
import { useNavigate } from 'react-router-dom'
import { candidateContext, userContext } from '../context'

function CandidateCard(props) {
     const { updateCandidateId } = useContext(candidateContext)
     const { visitorType } = useContext(userContext)
     const navigate = useNavigate()
     const handleSpecificCandidate = () => {
          updateCandidateId(`${props.link}`)
          navigate(`${props.link}`)
     }
     return (
          <div className="card w-[200px] h-[300px] sm:w-[240px] sm:h-[340px]">
               <div className="image">
                    <img src={props.candidateImage} alt="Candidate Image" />
               </div>
               <div className="candidate-content flex flex-col flex-wrap">
                    <p className='candidate-p font-bold text-2xl sm:text-3xl'>{props.candidateName}</p>
                    <p className="candidate-p text-lg sm:text-xl">{props.partyName}</p>
                    {visitorType === 'admin' ?
                         <Button innerText={props.innerText} onClick={props.onClick} />
                         :
                         <div onClick={handleSpecificCandidate}>
                              <Button innerText={"More Details"} link={`${props.link}`} />
                         </div>
                    }
               </div>
          </div>
     )
}

export default CandidateCard