
import '../Styles/Button.css'
import React from 'react'
import { Link } from 'react-router-dom'
const Button = (props) => {
     return (
          <>
               <button id='button' disabled={props.disabled} onClick={props.onClick} className=' text-2xl 2xl:text-3xl py-4 2xl:py-10 px-10 2xl:px-24'>
                    <Link to={props.link}><span>{props.innerText}</span></Link>
               </button>
          </>
     )
}
export default Button