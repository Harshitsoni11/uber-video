import React, { useState, useContext } from "react";
import { Link, useNavigate} from "react-router-dom";
import { CaptianDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptionSignup = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [passowrd, setPassword] = useState("");
  const [firtsName, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [userData, setUserData] = useState("");

  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const { captain, setCaptain } = useContext(CaptianDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    const captionData = {
      fullname: { firstname: firtsName, lastname: lastname },
      email: email,
      password: passowrd,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/caption/register`,captionData
    );

    if (response.status === 200) {
      const data = response.data;
      setCaptain(data.caption);
      localStorage.setItem("token", data.token);
      navigate("/captain-home");
    }
    setFirstName("");
    setLastName("");
    setemail("");
    setPassword("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity("");
    setVehicleType("");
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        ></img>
        <h3 className="text-lg font-meduim mb-2">What's our Caption's name</h3>

        <div className="flex gap-3 mb-3">
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
          <h3 className="text-lg font-meduim mb-2">
            What's our Caption's email
          </h3>
          <input
            required
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="bg-[#eeeeee] mb-3 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="emailexample.com"
          />
          <h3 className="text-lg font-meduim mb-2">Enter Password</h3>
          <input
            value={passowrd}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-3 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            required
            type="Password"
            placeholder="Password"
          ></input>

          <h3 className="text-lg font-meduim mb-2">Vehicle Information</h3>
          <div  className="flex gap-3 mb-5">
            <input
              type="text"
              className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              required
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              placeholder="Vehicle color"
            />
            <input
              type="text"
              className="bg-[#eeeeee]  rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              required
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              placeholder="Plate number"
            />
          </div>
          <div className="flex gap-3 mb-5">
            <input
              type="number"
              className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              required
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              placeholder="Vehicle capacity"
            />

            <select
              type="text"
              className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-medium placeholder:text-base"
              required
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              
            >
              <option value="" disabled>Select vehicle</option>
              <option value="car">car</option>
              <option value="motorcycle">mototycle</option>
              <option value="auto">auto</option>

            </select>
          </div>
          <button className="bg-[#111] text-white font-semibold mb-4 rounded px-4 py-2 border w-full text-lg placeholder:text-base">
            SignUp
          </button>

          <p className="text-center">
            Already have a account?{" "}
            <Link to="/caption-login" className="text-blue-600">
              Login as caption
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default CaptionSignup;
