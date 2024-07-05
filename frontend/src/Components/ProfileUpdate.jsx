import "../Styles/ProfileUpdate.css"
import { useSelector } from "react-redux"
import React, { useContext, useEffect, useState } from 'react'
import { userContext } from "../context"
import { Link, useNavigate } from "react-router-dom"
import Button from "./Button"
import api from "../axiosInstance"
import { server, serverWithId } from "../server"

function ProfileUpdate() {

  const { userData } = useContext(userContext)
  const [data, setData] = useState({})
  const navigate = useNavigate()
  const [avatarPreview, setAvatarPreview] = useState(userData.avatar)
  const { visitorType } = useContext(userContext)
  const userId = useSelector(state => state.userValues.userId)
  const [err, setErr] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    setData({
      firstName: userData.firstName,
      lastName: userData.lastName
    })
  }, [userData])

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'avatar') {
      const file = files[0]
      setData({ ...data, [name]: file })
      setAvatarPreview(URL.createObjectURL(file))

    } else {
      setData({ ...data, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('accessToken')
      await api.patch(`${serverWithId}/${userId}/api/v1/user/profile/update`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"

        }
      })
      setSuccess('Credentials Updated Successfully')
      navigate(`/${userId}/api/v1/user/profile/update`)

    } catch (error) {
      setErr(error.response?.data?.message || 'Sorry for inconvenience, I am working to resolve this issue')
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setErr('');
      setSuccess('')
    }, 2000);
    return () => clearTimeout(timer);
  }, [err, success]);

  return (
    <>
      {err &&
        <div className="errorField">
          <p>{err}</p>
        </div>
      }

      <div className="formSection mt-10">
        <div className="form-headings">
          <p className=' text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold text-left'>Update Profile</p>
        </div>

        <form className="flex" onSubmit={handleSubmit} >
          <div className="allEnteries w-full sm:w-[50%] flex flex-col gap-10  justify-between">
            <div className="header flex gap-10">
              {userData.avatar ?
                <img src={avatarPreview} alt="User Avatar" className="avatar object-cover " />
                : <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkVto1t4ROcxcqi0SrFtgSQQJ1Aau0ad1d3g&s" alt="No Avatar" className="avatar" />
              }
              <Button innerText="Update Avatar" onClick={() => document.getElementById('fileInput').click()} />
              <input
                type="file"
                name='avatar'
                id="fileInput"
                style={{ display: 'none' }}
                onChange={handleChange}
              />
            </div>
            <div className="formData flex flex-col gap-10">
              <div className="ele firstName flex flex-col gap-3">
                <label htmlFor="firstName" className="text-lg lg:text-xl xl:text-2xl">First Name</label>
                <input
                  className="text-lg lg:text-xl xl:text-2xl"
                  type="text"
                  name="firstName"
                  id="firstName"
                  onChange={handleChange}
                  value={data.firstName || ''}
                />
              </div>
              <div className="ele lastname flex flex-col gap-3">
                <label htmlFor="lastName" className="text-lg lg:text-xl xl:text-2xl">Last Name</label>
                <input
                  className="text-lg lg:text-xl xl:text-2xl"
                  type="text"
                  name="lastName"
                  id="lastName"
                  onChange={handleChange}
                  value={data.lastName || ''}
                />
              </div>
              <div className="ele uniqueId flex flex-col gap-3">
                <label htmlFor="uniqueId" className="text-lg lg:text-xl xl:text-2xl">Aadhar card Number</label>
                <input
                  className="text-lg lg:text-xl xl:text-2xl"
                  type="number"
                  name="uniqueId"
                  id="uniqueId"
                  defaultValue={userData.uniqueId}
                  disabled
                />
              </div>
              <div className="ele voterId flex flex-col gap-3">
                <label htmlFor="voterId" className="text-lg lg:text-xl xl:text-2xl">Voter Card Id</label>
                <input
                  className="text-lg lg:text-xl xl:text-2xl"
                  type="number"
                  name="voterId"
                  id="voterId"
                  defaultValue={userData.voterId}
                  disabled
                />
              </div>
              <div className="ele isVoted flex flex-col gap-3">
                <label htmlFor="isVoted" className="text-lg lg:text-xl xl:text-2xl">Voted :</label>
                <input
                  className="text-lg lg:text-xl xl:text-2xl"
                  type="text"
                  name="isVoted"
                  id="isVoted"
                  defaultValue={userData.isVoted}
                  disabled
                />
              </div>

              <div className="button flex gap-6">
                <button type="button" id="back" className="text-2xl 2xl:text-3xl py-4 2xl:py-10 px-10 2xl:px-24">
                  <Link to={`/${userId}`} state={visitorType}>
                    <span>&lt; Back</span>
                  </Link>
                </button>
                <button
                  type="submit"
                  id="button"
                  className={`text-2xl 2xl:text-3xl py-4 2xl:py-10 px-10 2xl:px-24 ${Object.keys(data).length === 0 ? 'disabled' : ''}`}
                  disabled={Object.keys(data).length === 0}
                >
                  <span>Submit</span>
                </button>
                <button type="button" id="button" className="text-2xl 2xl:text-3xl py-4 2xl:py-10 px-10 2xl:px-24">
                  <Link to={'password'} state={visitorType}>
                    <span>Update Password</span>
                  </Link>
                </button>
                {success &&
                  <div className="errorField greenField">
                    <p>{success}</p>
                  </div>
                }
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default ProfileUpdate
