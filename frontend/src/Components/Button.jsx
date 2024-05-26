
import '../Styles/Button.css'
import React from 'react'
// this compoennt accepts the props 
const Button = (props) => {
     return (
          <>
               <button id='button' className=' text-2xl 2xl:text-3xl py-4 2xl:py-10 px-10 2xl:px-24'>
                    <span>{props.innerText}</span>
                    {/* What to display on the button will come from the parent component */}
               </button>
          </>
     )
}
export default Button