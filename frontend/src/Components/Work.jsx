import React from 'react'
import image1 from '../../assets/register.png'
import image2 from '../../assets/selectOne.png'
import image3 from '../../assets/done.png'
import image4 from '../../assets/1.png'
import image5 from '../../assets/2.png'
import image6 from '../../assets/3.png'
import '../Styles/Work.css'

function Work() {
     return (
          <section id="workSection">
               <div className="workHeading">
                    <p className='workP text-3xl lg:text-4xl xl:text-5xl 2xl:text-4xl font-extrabold'>How it Works?</p>
               </div>
               <div className="workProcess grid gap-8 sm:grid-cols-3">
                    <div className="stage ">
                         <img src={image1} alt="" />
                         <p><img src={image4} />Register</p>
                         <p className='innerDes'>Signup or login to your account with aadharcard number and voter ID to participate in election.</p>
                    </div>
                    <div className="stage">
                         <img src={image2} alt="" />
                         <p><img src={image5} />Choose Your Candidate</p>
                         <p className='innerDes'>Choose whom you want to vote.</p>
                    </div>
                    <div className="stage">
                         <img src={image3} alt="" />
                         <p><img src={image6} />Done</p>
                         <p className='innerDes'>Your response is submitted and wait for the results.</p>
                    </div>
               </div>
          </section>
     )
}

export default Work