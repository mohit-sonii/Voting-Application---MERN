
import React from 'react'
import "../Styles/CandidateCard.css"
import Button from './Button'

function CandidateCard(props) {
     return (
          <div className="card w-[200px] h-[300px] sm:w-[240px] sm:h-[340px]">
               <div className="image">
                    <img src={props.candidateImage} alt="Candidate Image" />
               </div>
               <div className="candidate-content flex flex-col flex-wrap">
                    <p className='candidate-p font-bold text-2xl sm:text-3xl'>{props.candidateName}</p>
                    <p className="candidate-p text-lg sm:text-xl">{props.partyName}</p>
                    <Button innerText={"More Details"} link={`${props.link}`} />
               </div>
          </div>
     )
}

export default CandidateCard