import React from 'react'
import Button from '../Button'
import "../../Styles/AdminHome.css"

function AdminHome() {
     return (
          <div className="main-container-for-admin-home h-screen flex">

               <div className="admin-home flex gap-20 h-screen flex-col">
                    <div className="logout-admin ">
                         <Button innerText={'Logout'}/>
                    </div>
                    <div className="admin-headings flex flex-col gap-10">
                         <p className="heading admin-heading font-extrabold text-5xl md:text-6xl lg:text-7xl">Welcome, Mohit Soni ~ It's been a while</p>
                         <p className="admin-subheading  text-2xl md:text-3xl lg:text-4xl">What you are planning to do?</p>
                    </div>
                    <div className="admin-functionalities flex gap-10">
                         <Button innerText={'Add a Candidate'}/>
                         <Button innerText={'Remove a Candidate'}/>
                         <Button innerText={'Update a Candidate'} />
                         <Button innerText={'View Vote Counts'} />
                         <Button innerText={'View Vote Counts'} />
                    </div>
               </div>
          </div>
     )
}

export default AdminHome