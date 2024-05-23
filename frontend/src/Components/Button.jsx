
import '../Styles/Button.css'
import React from 'react'

const Button = (props) => {
     return (
          <>
               <button id='button' className=' text-2xl 2xl:text-3xl py-4 2xl:py-10 px-10 2xl:px-24'>
                    <span>{props.innerText}</span>
               </button>
          </>
     )
}
export default Button