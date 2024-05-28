
import { useEffect, useState } from "react"
import "../Styles/Form.css"
import axios from 'axios'
import Button from './Button'

function Form() {

     // state to manage all the values in the form
     const [data, setData] = useState({ username: '', phone: '', state: '', district: '', email: '', message: '', voterCard: '', query: '' })
     // state to store all the possible states of the country. usually fethcing from API
     const [states, setState] = useState([])
     // state to store all the district of that particular state
     const [districts, setDistricts] = useState([])
     // to store all the API states,districts data
     const [apiAreas, setArea] = useState([])


     // this function is used to update the data value everytime when input field gets changed
     const handleChange = (e) => {
          // destructure the 'name' and 'value' from target field
          const { name, value } = e.target
          // if the 'name' for an field is 'phone' then do 
          if (name == 'phone') {
               // validate that only Integers should allowed
               const numericRegex = /^\d*$/; // Regex to allow only integers
               // if the test does not contain an integer then reutrn simply that means do nothing
               if (!numericRegex.test(value)) {
                    return;
               }
          }
          // if alll the field are coorect then do update the value of that particular changed state
          setData({ ...data, [e.target.name]: e.target.value })
          // console it just for validation
          console.log({ ...data, [e.target.name]: e.target.value })
     }


     async function getAreaDetail() {
          // fetch the API before hand so that we do not need to doit again and again
          const response = await axios.get('http://localhost:5000/api/api-data')
          // store the API data in a state.
          setArea(response.data)
     }

     // whne the component mount call that function
     useEffect(() => {
          getAreaDetail()
     }, []) // run only once

     // when the apiAreas state change then run this function
     useEffect(() => {
          // if that state has vlaue only then call the getSate function
          if (apiAreas.length > 0) {
               getState()
          }
     }, [apiAreas]) // however because we have stored the API data in a vairable this will run only once


     const getState = async () => {
          try {
               // now the API data is in 'apiAreas' state, do iterate to get the states
               const res = apiAreas.map((item) => item.state)
               // update the state
               setState(res)

          } catch (error) {
               // catch errors in case of any
               console.log(error.message)
          }
     };

     useEffect(() => {
          // if (states.length > 0) {
          setDistricts('')
          setData({ ...data, [data.district]: '' })

          getDistrict()
          // }
     }, [data.state])

     const getDistrict = async () => {
          try {
               // finding the index for the state 
               const dis = apiAreas.find(item => item.state === data.state)
               setDistricts(dis.districts)
          } catch (err) {
               console.log(err.message)
          }
     }

     return (
          <div className="formSection">
               <div className="form-headings">
                    <p className=' text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold text-left'>Contact Us</p>
                    <p className="text-2xl lg:text-2xl xl:text-3xl font-extralight">Report any problems or concerns related to the voting process</p>
               </div>

               <form className="flex " >
                    <div className="allEnteries w-full grid  grid-cols-1 sm:grid-cols-2 gap-10  justify-between">

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
                         <div className="ele email">
                              <input type="email" name="email" value={data.email} id="email" className="text-lg lg:text-xl xl:text-2xl" placeholder="Enter your Email" />
                         </div>

                         <div className="ele states">
                              <select name="state" value={data.state} id="state" required className="text-lg lg:text-xl xl:text-2xl" onChange={handleChange} >
                                   {/* It should map all the states from the states list that comes after fetching the API where all the states are stored. Use their index as the Key */}
                                   <option value="">Select your State</option>
                                   {states && states.length > 0 && states.map((ele, index) => (
                                        <option key={index} value={ele.state}>{ele}</option>
                                   ))}
                              </select>
                         </div>
                         <div className="ele districts">
                              <select name="district" id="district" required className="text-lg lg:text-xl xl:text-2xl" onChange={handleChange} >
                                   <option value="">Select your District</option>
                                   {/* {!districts && <option value="">Select your District</option>} */}
                                   {districts && districts.length > 0 && districts.map((ele, index) => (
                                        <option key={index} value={ele}>{ele}</option>
                                   ))}
                              </select>
                         </div>
                    </div>
                    <div className="ele message ">
                         <textarea placeholder="Enter your message" name="message" id="message" onChange={handleChange} className="textarea text-lg xl:text-xl"></textarea>
                    </div>
                    <div className="button">
                         <button type="submit"><Button innerText={"Submit"}/></button>
                    </div>
               </form>
          </div>
     )
}


export default Form