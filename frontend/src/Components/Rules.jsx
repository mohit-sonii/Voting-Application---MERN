import React from 'react'
import '../Styles/Rules.css'

function Rules() {
     return (
          <div id='rules'>
               <div className="rules-headings">
                    <p className='text-3xl lg:text-4xl xl:text-5xl 2xl:text-4xl font-extrabold className="numbering"old text-left'>Rules & Regulations</p>
               </div>

               <div className="innerDes text-2xl xl:text-3xl 2xl:text-4xl font-light ">
                    <span>
                         <p className="numbering font-semibold">1)</p>
                         <p className='numberDes'>All members aged 18 and above who have registered by registration deadline are eligible to vote.</p>
                    </span>
                    <span>
                         <p className="numbering font-semibold">2)</p>
                         <p className='numberDes'>Voters must log in using their unique ID and password to cast their vote</p>
                    </span>
                    <span>
                         <p className="numbering font-semibold">3)</p>
                         <p className='numberDes'>Voters can cast their votes through the online ballot available on the application. Instructions will be provided on the voting page.</p>
                    </span>
                    <span>
                         <p className="numbering font-semibold">4)</p>
                         <p className='numberDes'>All votes are confidential. Voter information will be encrypted and used only for verification purposes.</p>
                    </span>
                    <span>
                         <p className="numbering font-semibold">5)</p>
                         <p className='numberDes'>The application is designed to be accessible to all users. Assistance is available for those who need it by contacting us</p>
                    </span>
                    <span>
                         <p className="numbering font-semibold">6)</p>
                         <p className='numberDes'>Vote tampering, coercion, and other fraudulent activities are strictly prohibited.</p>
                    </span>
                    <span>
                         <p className="numbering font-semibold">7)</p>
                         <p className='numberDes'>Once your vote is submitted, it cannot be changed</p>
                    </span>
                    <span>
                         <p className="numbering font-semibold">8)</p>
                         <p className='numberDes'>Only registered users are allowed to vote</p>
                    </span>
                    <span>
                         <p className="numbering font-semibold">9)</p>
                         <p className='numberDes'>Vote according to your own preferences and do not let others to influence your decision</p>
                    </span>
                    <span >
                         <p className="numbering font-semibold">10)</p>
                         <p className='numberDes'>By participating in the vote, users agree to comply with all rules and regulations outlined above.</p>
                    </span>
               </div >
          </div >
     )
}

export default Rules