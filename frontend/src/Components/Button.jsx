
import '../Styles/Button.css'
import React from 'react'
import { Link } from 'react-router-dom'
// this compoennt accepts the props 
const Button = (props) => {
     return (
          <>
               <button id='button' className=' text-2xl 2xl:text-3xl py-4 2xl:py-10 px-10 2xl:px-24'>
                    <Link to={props.link}><span>{props.innerText}</span></Link>
                    {/* What to display on the button will come from the parent component */}
               </button>
          </>
     )
}
export default Button