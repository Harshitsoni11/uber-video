import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserLogout = () => {

    const token=localStorage.getItem('token')
    // console.log(token);
    const navigate=useNavigate();
    console.log(token);

    useEffect(() => {
       const logout=async()=>{
        await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`,{headers:{
            Authorization:`Bearer ${token}`
        }}).then((res)=>{
            if(res.status===200){
                localStorage.removeItem('token');
                navigate('/login');
            }
        }).catch((err)=>{
            console.log(err);
        })
    }

    logout();
      
    },[])
   
    
  return (
    <div>
      UserLOgout
    </div>
  )
}

export default UserLogout
