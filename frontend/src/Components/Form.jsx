
import { useEffect, useState } from "react"
import "../Styles/Form.css"

function Form() {

     const [data, setData] = useState({ username: '', phone: '', state: '', pinCode: '', email: '', message: '', voterCard: '', query: '' })

     const handleChange = (e) => {

          const { name, value } = e.target
          if (name == 'phone') {
               const numericRegex = /^\d*$/; // Regex to allow only integers
               if (!numericRegex.test(value)) {
                    return;
               }

          }

          setData({ ...data, [e.target.name]: e.target.value })
     }
     return (
          <div className="formSection">
               <div className="form-headings">

                    <p className=' text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold text-left'>Contact Us</p>
                    <p className="text-2xl lg:text-2xl xl:text-3xl font-extralight">Report any problems or concerns related to the voting process</p>
               </div>

               <form className="grid sm:grid-cols-2 gap-5" >
                    <div className="ele username">
                         <input className="text-lg lg:text-xl xl:text-2xl " type="text" name="username" value={data.username} id="username" onChange={handleChange} placeholder="Enter your name" required />
                    </div>
                    <div className="ele phone">
                         <input className="text-lg lg:text-xl xl:text-2xl " type="tel" name="phone" value={data.phone} id="phone" onChange={handleChange} placeholder="Enter your Phone Number" required />
                    </div>
                    <div className="ele query">
                         <select className="text-lg lg:text-xl xl:text-2xl opacity-80" id="contact-type" name="contact-type" required>
                              <option value=""  >Select your query Type</option>
                              <option value="general-inquiries">General Inquiries</option>
                              <option value="technical-support">Technical Support</option>
                              <option value="voting-issues">Voting Issues</option>
                              <option value="feedback-suggestions">Feedback and Suggestions</option>
                              <option value="dispute-resolution">Dispute Resolution</option>
                              <option value="partnerships-collaborations">Partnerships and Collaborations</option>
                         </select>
                    </div>

               </form>
          </div>
     )
}


export default Form