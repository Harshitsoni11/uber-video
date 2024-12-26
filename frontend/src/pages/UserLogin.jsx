import React, { useState,useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";

const UserLogin = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState('');
  const [userData, setUserData] = useState({})

  const {user, setUser} = useContext(UserDataContext);
  const navigate=useNavigate();

  const submitHandler= async (e)=>{
    e.preventDefault()
    const userData={
      email:email,password:password
    }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);

    if(response.status===200){
      const data=response.data;
      setUser(data.user);
      localStorage.setItem('token',data.token);
      navigate("/home");
    }
    console.log(userData);
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

        <p className="text-center">New here? <Link to='/signup' className="text-blue-600">Create a new Account</Link></p>
      </form>
      </div>
      
      <div>
        <Link
        to={'/caption-login'}
        className="bg-[#81d999] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base" 

        >Sign as Captain</Link>
      </div>
    </div>
  );
};

export default UserLogin;
