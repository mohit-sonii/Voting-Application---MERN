
import { useEffect, useState } from "react"
import "../Styles/Form.css"
import axios from 'axios'

function Form() {

     // state to manage all the values in the form
     const [data, setData] = useState({ username: '', phone: '', state: '', pinCode: '', email: '', message: '', voterCard: '', query: '' })
     // state to store all the possible states of the country. usually fethcing from API
     const [states, setState] = useState([])

     const handleChange = (e) => {
          const { name, value } = e.target
          if (name == 'phone') {
               const numericRegex = /^\d*$/; // Regex to allow only integers
               if (!numericRegex.test(value)) {
                    return;
               }

          }
          setData({ ...data, [e.target.name]: e.target.value })
          console.log({ ...data, [e.target.name]: e.target.value })
     }

     useEffect(() => {
          const getState = async () => {
               try {
                    const response = await axios.get('http://localhost:5000/api/api-data');
                    setState(response.data);
                    // console.log(response.data)
               } catch (error) {
                    console.log(error.message)
               }
          };
          getState();
     }, []);

     return (
          <div className="formSection">
               <div className="form-headings">
                    <p className=' text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold text-left'>Contact Us</p>
                    <p className="text-2xl lg:text-2xl xl:text-3xl font-extralight">Report any problems or concerns related to the voting process</p>
               </div>

               <form className="grid sm:grid-cols-2 gap-10" >
                    <div className="ele username">
                         <input className="text-lg lg:text-xl xl:text-2xl " type="text" name="username" value={data.username} id="username" onChange={handleChange} placeholder="Enter your name" required />
                    </div>
                    <div className="ele phone">
                         <input className="text-lg lg:text-xl xl:text-2xl " type="tel" name="phone" value={data.phone} id="phone" onChange={handleChange} placeholder="Enter your Phone Number" required />
                    </div>
                    <div className="ele query">
                         <select className="text-lg lg:text-xl xl:text-2xl" id="contact-type" name="query" onChange={handleChange} value={data.query} required>
                              <option value=""  >Select your Query Type</option>
                              <option value="general-inquiries">General Inquiries</option>
                              <option value="technical-support">Technical Support</option>
                              <option value="voting-issues">Voting Issues</option>
                              <option value="feedback-suggestions">Feedback and Suggestions</option>
                              <option value="dispute-resolution">Dispute Resolution</option>
                              <option value="partnerships-collaborations">Partnerships and Collaborations</option>
                         </select>
                    </div>
                    <div className="ele states">
                         <select name="state" value={data.state} id="state-name" required className="text-lg lg:text-xl xl:text-2xl" onChange={handleChange} >
                              <option value="">Select your State</option>
                              {states && states.length > 0 && states.map((ele, index) => (
                                   <option key={index} value={ele.state}>{ele}</option>
                              ))}
                         </select>
                    </div>

               </form>
          </div>
     )
}


export default Form