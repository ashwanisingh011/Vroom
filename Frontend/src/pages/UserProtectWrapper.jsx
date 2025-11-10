import React, {useEffect, useState, useContext} from 'react'
import { UserDataContext } from '../context/UserContext'

import {useNavigate} from 'react-router-dom'

const UserProtectWrapper = ({
    children
}) => {
    const token = localStorage.getItem('token')
    const [isLoading, setIsLoading] = useState(true)
    const {user, setUser} = useContext(UserDataContext)
    const navigate = useNavigate();
  
    useEffect(()=>{
      if(!token){
        navigate('/login')
      }
    }, [token])
    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      if(response.status === 200){
        setUser(response.data.user)
        setIsLoading(false)
      }
    }).catch(err => {
      console.log(err)
      localStorage.removeItem('token')
      navigate('/user-login')
    })
    if(isLoading){
      return(
        <div>Loading...</div>
      )
    }
  return (
    <>
        {children}
    </>
  )
}

export default UserProtectWrapper