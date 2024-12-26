import React,{useContext, useEffect,useState} from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const UserProtectWrapper = ({children}) => {

    const token=localStorage.getItem('token');
    const navigate = useNavigate();
   const [isLoading, setisLoading] = useState(true);
   const { user, setUser } = useContext(UserDataContext);

    

    useEffect(() => {
      if(!token){
        navigate('/login')
    }
      const fetchUserProfile = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });
  
          if (response.status === 200) {
            setUser(response.data);
            setisLoading(false);
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
          localStorage.removeItem("token");
          navigate("/login");
        } 
      };
  
      if (token) {
        fetchUserProfile();
      }
    }, []);

    if (isLoading) {
      return <div>Loading...</div>;
    }
   

  return (
    <>
      {children}
    </>
  )
}

export default UserProtectWrapper
