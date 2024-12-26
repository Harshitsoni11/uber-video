import React, { useState,useContext } from "react";
import { Link,useNavigate } from "react-router-dom";

import axios from "axios";
import {UserDataContext} from '../context/UserContext';

const UserSignup = () => {
  const [email, setemail] = useState("");
  const [passowrd, setPassword] = useState("");
  const [firtsName, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [userData, setUserData] = useState("");

  const navigate = useNavigate();
  const {user, setUser} = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    const newUser={
      fullname:{firstname:firtsName,lastname:lastname},
          email: email,
      password: passowrd,
     
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

    if(response.status===200){
      const data=response.data;
      setUser(data.user);
      localStorage.setItem('token',data.token);
      
      navigate("/home");
    }
    

  
    setFirstName("");
    setLastName("");
    setemail("");
    setPassword("");


  };
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        ></img>
        <h3 className="text-lg font-meduim mb-2">What's your Name</h3>

        <div className="flex gap-3 mb-5">
          <input
            required
            value={firtsName}
            onChange={(e) => setFirstName(e.target.value)}
            className="bg-[#eeeeee] w-[1/2] rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="text"
            placeholder="First name"
          />

          <input
            required
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            className="bg-[#eeeeee] w-[1/2]  rounded px-4 py-2 border w-full text-lg placeholder:text-sm"
            type="text"
            placeholder="Last name"
          />
        </div>
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg font-meduim mb-2">What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="emailexample.com"
          />
          <h3 className="text-lg font-meduim mb-2">Enter Password</h3>
          <input
            value={passowrd}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            required
            type="Password"
            placeholder="Password"
          ></input>
          <button className="bg-[#111] text-white font-semibold mb-4 rounded px-4 py-2 border w-full text-lg placeholder:text-base">
            Create a account
          </button>

          <p className="text-center">
            Already have a account?{" "}
            <Link to="/login" className="text-blue-600">
              Login here
            </Link>
          </p>
        </form>
      </div>

      <div>
        <p>
          By signing up, you agree to our{" "}
          <span className="text-blue-600">Terms</span>,{" "}
          <span className="text-blue-600">Data Policy</span> and{" "}
          <span className="text-blue-600">Cookies Policy</span>.
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
