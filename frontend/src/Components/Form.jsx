
import { useEffect, useState } from "react"
import "../Styles/Form.css"
import api from "../axiosInstance.js"

function Form() {

     const [data, setData] = useState({ username: '', phone: '', state: '', district: '', email: '', message: '', queryType: '' })
     const [states, setState] = useState([])
     const [districts, setDistricts] = useState([])
     const [apiAreas, setArea] = useState([])
     const [formError, setFormError] = useState(null)
     const [isSubmitted, setSubmit] = useState(false)


     const handleChange = (e) => {
          const { name, value } = e.target
          if (name == 'phone') {
               const numericRegex = /^\d*$/; 
               if (!numericRegex.test(value)) {
                    return;
               }
          }
          setData({ ...data, [e.target.name]: e.target.value })
     }

     async function getAreaDetail() {
          try {

               const response = await api.get('api/v1/api/districts-and-states/district-state')
               const areas = response.data.data?.[0]?.apiData?.states
               setArea(areas)
          } catch (err) {
               setFormError(err.response?.data?.message || 'An error occured while sending your query')

          }
     }

     useEffect(() => {
          getAreaDetail()
     }, [])

     useEffect(() => {
          if (apiAreas.length > 0) {
               getState()
          }
     }, [apiAreas])

     const getState = async () => {
          try {
               const res = apiAreas.map((item) => item.state)
               setState(res)
          } catch (error) {
               setFormError(err.response?.data?.message || 'An error occured while sending your query')
          }
     };

     useEffect(() => {
          setDistricts('')
          setData({ ...data, [data.district]: '' })
          getDistrict()
     }, [data.state])

     const getDistrict = async () => {
          try {
               const dis = apiAreas.find(item => item.state === data.state)
               if (dis) {
                    setDistricts(dis.districts);
               } else {
                    setDistricts([]);
               }
          } catch (err) {
               setFormError(err.response?.data?.message || 'An error occured while sending your query')
          }
     }

     const handleSubmit = async (e) => {
          e.preventDefault()
          try {
               const addQuery = {
                    username: data.username,
                    phone: data.phone,
                    state: data.state,
                    district: data.district,
                    email: data.email,
                    message: data.message,
                    queryType: data.queryType
               };
               const response = await api.post('/', addQuery, {
                    headers: {
                         "Content-Type": "application/json"
                    }
               })
               if (response.status === 200) {
                    setSubmit(true)
                    setData({
                         username: '',
                         phone: '',
                         state: '',
                         email: '',
                         message: '',
                         queryType: '',
                         district: ''
                    })
               } else {
                    throw new Error('Error while sending your query')
               }
          } catch (err) {
               setFormError(err.response?.data?.message || 'An error occured while sending your query')
          }
     }

     useEffect(() => {
          const timer = setTimeout(() => {
               setSubmit(false);
               setFormError(null);
          }, 2000);

          return () => clearTimeout(timer); 
     }, [isSubmitted, formError]);

     return (
          <div className="formSection">
               <div className="form-headings">
                    <p className=' text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold text-left'>Contact Us</p>
                    <p className="text-2xl lg:text-2xl xl:text-3xl font-extralight">Report any problems or concerns related to the voting process</p>
               </div>

               <form className="flex" onSubmit={handleSubmit} >
                    <div className="allEnteries w-full grid  grid-cols-1 sm:grid-cols-2 gap-10  justify-between">

                         <div className="ele username">
                              <input className="text-lg lg:text-xl xl:text-2xl " type="text" name="username" value={data.username} id="username" onChange={handleChange} placeholder="Enter your name" required />
                         </div>
                         <div className="ele phone">
                              <input className="text-lg lg:text-xl xl:text-2xl " type="tel" name="phone" value={data.phone} id="phone" maxLength={10} onChange={handleChange} placeholder="Enter your Phone Number" required />
                         </div>
                         <div className="ele queryType">
                              <select className="text-lg lg:text-xl xl:text-2xl" id="contact-type" name="queryType" onChange={handleChange} value={data.queryType} required>
                                   <option value="">Select your queryType Type</option>
                                   <option value="general-inquiries">General Inquiries</option>
                                   <option value="technical-support">Technical Support</option>
                                   <option value="voting-issues">Voting Issues</option>
                                   <option value="feedback-suggestions">Feedback and Suggestions</option>
                                   <option value="dispute-resolution">Dispute Resolution</option>
                                   <option value="partnerships-collaborations">Partnerships and Collaborations</option>
                              </select>
                         </div>
                         <div className="ele email">
                              <input type="email" name="email" value={data.email} id="email" className="text-lg lg:text-xl xl:text-2xl" placeholder="Enter your Email" onChange={handleChange} />
                         </div>

                         <div className="ele states">
                              <select name="state" value={data.state} id="state" required className="text-lg lg:text-xl xl:text-2xl" onChange={handleChange} >
                                   <option value="">Select your State</option>
                                   {states && states.length > 0 && states.map((ele, index) => (
                                        <option key={index} value={ele.state}>{ele}</option>
                                   ))}
                              </select>
                         </div>
                         <div className="ele districts">
                              <select value={data.district} name="district" id="district" required className="text-lg lg:text-xl xl:text-2xl" onChange={handleChange} >
                                   <option value="">Select your District</option>
                                   {districts && districts.length > 0 && districts.map((ele, index) => (
                                        <option key={index} value={ele}>{ele}</option>
                                   ))}
                              </select>
                         </div>
                    </div>
                    <div className="ele message ">
                         <textarea value={data.message} placeholder="Enter your message" name="message" id="message" onChange={handleChange} className="textarea text-lg xl:text-xl"></textarea>
                    </div>
                    <div className="button">
                         <button type="submit" id="button" className="text-2xl 2xl:text-3xl py-4 2xl:py-10 px-10 2xl:px-24"><span>Submit</span></button>
                    </div>
               </form>
               <div>
                    {isSubmitted && <p className="text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-extralight ">Submitted Successfully</p>}
                    {formError && <p className="text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-extralight ">{formError}</p>}
               </div>
          </div>
     )
}
export default Form