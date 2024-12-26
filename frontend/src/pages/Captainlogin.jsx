import React,{ useState,useContext} from 'react'
import { Link,useNavigate} from "react-router-dom";
import axios from 'axios';
import { CaptianDataContext } from '../context/CaptainContext';

const Captainlogin = () => {


  const [email, setemail] = useState("");
  const [password, setpassword] = useState('');
  const [captionData, setCaptionData] = useState({})
  const {caption, setCaptain} = useContext(CaptianDataContext);
  const navigate=useNavigate(); 

  const submitHandler= async (e)=>{
    e.preventDefault()
   const captain={
     email:email,
     password:password
   }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/caption/login`, captain);

    if(response.status===200){
      const data=response.data;
      setCaptain(data.caption);
      localStorage.setItem('token',data.token); 
      navigate("/captain-home");
    }

  
    setemail("");
    setpassword("");
  }

  return (
    <div className="p-7 h-screen flex flex-col justify-between">

      <div>
      <img className="w-16 mb-10" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt=""></img>
      <form onSubmit={(e)=>{submitHandler(e)}}>
        <h3 className="text-lg font-meduim mb-2">What's your email</h3>
        <input required
        value={email}
        onChange={(e) => setemail(e.target.value)}
        className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base" 
        type="email" placeholder="emailexample.com" />
        <h3 className="text-xl mb-2">Enter Password</h3>
        <input
         value={password}
         onChange={(e) => setpassword(e.target.value)}
        className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base" 
        required type="Password" placeholder="Password"></input>
        <button
        className="bg-[#111] text-white font-semibold mb-4 rounded px-4 py-2 border w-full text-lg placeholder:text-base" 
        >Login</button>

        <p className="text-center">Join a Fleet? <Link to='/caption-signup' className="text-blue-600">Join as a Caption</Link></p>
      </form>
      </div>
      
      <div>
        <Link
        to={'/login'}
        className="bg-[#81d999] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base" 

        >Sign as User</Link>
      </div>
    </div>
  )
}

export default Captainlogin
