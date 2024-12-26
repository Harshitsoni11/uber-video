import React, { useContext, useRef, useState } from "react";
import gsap from "gsap";
import axios from "axios";
import { useGSAP } from "@gsap/react";
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehicelPanel from "../components/VehicelPanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitForDriver from "../components/WaitForDriver";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from '../context/UserContext';

const Home = () => {
  const [pickup, setpickup] = useState("");
  const [destination, setdestination] = useState("");
  const [panelOpen, setpanelOpen] = useState(false);
const panelRef = useRef(null);
const panelCloseref = useRef(null);
const vehiclePanelRef = useRef(null);
const confirmRidePanelRef = useRef(null);
const vehicleFoundRef = useRef(null);
const waitingdriverRef = useRef(null);

const [vehiclePanel, setvehiclePanel] = useState(false)
const [confirmRidePanel, setconfirmRidePanel] = useState(false);
const [vehicleFound, setVehicleFound] = useState(false);
const [waitingdriver, setwaitingdriver] = useState(false);

const [ pickupSuggestions, setPickupSuggestions ] = useState([])
const [ destinationSuggestions, setDestinationSuggestions ] = useState([])
const [ activeField, setActiveField ] = useState(null)
const [ fare, setFare ] = useState({})
const [ vehicleType, setVehicleType ] = useState(null)
const [ ride, setRide ] = useState(null)


const { socket } = useContext(SocketContext)
const { user } = useContext(UserDataContext)

useEffect(() => {
  socket.emit("join", { userType: "user", userId: user._id })
}, [ user ])

const handlePickupChange = async (e) => {
  setpickup(e.target.value)
  try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestion`, {
          params: { input: e.target.value },
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }

      })
      console.log(response.data);
      setPickupSuggestions(response.data)
  } catch {
      // handle error
  }
}

const handleDestinationChange = async (e) => {
  setdestination(e.target.value)
  try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestion`, {
          params: { input: e.target.value },
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      })
      setDestinationSuggestions(response.data)
  } catch {
      // handle error
  }
}

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(() => {
    if(panelOpen){
      gsap.to(panelRef.current, {
      height:'70%'
      })

      gsap.to(panelCloseref.current, {
        opacity:1
        })
    }else{
      gsap.to(panelRef.current, {
        height:'0%'
        })
        gsap.to(panelCloseref.current, {
          opacity:0
          })
    }
   
  },[panelOpen])

  useGSAP(() => {
    if(vehiclePanel){
      gsap.to(vehiclePanelRef.current, {
        transform:'translateY(0%)'
      })
    }else{
      gsap.to(vehiclePanelRef.current, {
        transform:'translateY(100%)'
      })
    }
   
  },[vehiclePanel])

  useGSAP(() => {
    if(confirmRidePanel){
      gsap.to(confirmRidePanelRef.current, {
        transform:'translateY(0%)'
      })
    }else{
      gsap.to(confirmRidePanelRef.current, {
        transform:'translateY(100%)'
      })
    }
   
  },[confirmRidePanel])

  useGSAP(() => {
    if(vehicleFound){
      gsap.to(vehicleFoundRef.current, {
        transform:'translateY(0%)'
      })
    }else{
      gsap.to(vehicleFoundRef.current, {
        transform:'translateY(100%)'
      })
    }
   
  },[vehicleFound])

  useGSAP(() => {
    if(waitingdriver){
      gsap.to(waitingdriverRef.current, {
        transform:'translateY(0%)'
      })
    }else{
      gsap.to(waitingdriverRef.current, {
        transform:'translateY(100%)'
      })
    }
   
  },[waitingdriver])


  
  async function findTrip() {
    setvehiclePanel(true)
    setpanelOpen(false)
      console.log(pickup, destination);
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
        params: {pickup: pickup, destination : destination },
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })


    setFare(response.data)


}

async function createRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
        pickup,
        destination,
        vehicleType
    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })


}

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
      ></img>
      <div className="h-screen w-screen">
        {/* img for temporary */}
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
        ></img>
      </div>

      <div className="h-screen flex flex-col justify-end absolute top-0 w-full">
        <div className=" h-[30%] bg-white p-5">
          <h5 ref={panelCloseref} onClick={() => setpanelOpen(!panelOpen)} className="absolute opacity-0 right-6 top-6 text-2xl">
          <i class="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form onSubmit={(e) => submitHandler(e)}>
            <input
              value={pickup}
              onClick={() =>{ setpanelOpen(true)
                 setActiveField('pickup')
                }}
              onChange={handlePickupChange}
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              value={destination}
              onClick={() => {
                setpanelOpen(true)
                setActiveField('destination')
            }}
              onChange={handleDestinationChange}
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter your Destination"
            />
           

          </form>

          <button onClick={findTrip} className='bg-black text-center text-white px-4 py-2 mt-3 mb-3 rounded  w-full'>Find Trip
          </button>
        </div>
        <div ref={panelRef} className="h-0 bg-white">
            <LocationSearchPanel setpanelOpen={setpanelOpen}
             suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
            setpickup={setpickup}
            setdestination={setdestination}
            activeField={activeField}
            vehiclePanel={vehiclePanel} setvehiclePanel={setvehiclePanel}/>
        </div>
      </div>

      <div ref={vehiclePanelRef} className="fixed z-10 w-full bg-white rounded-t-3xl bottom-0 px-3 py-6  translate-y-full">
        <VehicelPanel selectVehicle={setVehicleType}  fare={fare} setconfirmRidePanel={setconfirmRidePanel} setvehiclePanel={setvehiclePanel}/>

      </div>
      <div ref={confirmRidePanelRef} className="fixed z-10 w-full bg-white rounded-t-3xl bottom-0 px-3 py-6  translate-y-full">
        <ConfirmRide 
        createRide={createRide}
        pickup={pickup}
        destination={destination}
        fare={fare}
        vehicleType={vehicleType}
        setconfirmRidePanel={setconfirmRidePanel} setvehicleFound={setVehicleFound}/>
      </div>

      <div ref={vehicleFoundRef} className="fixed z-10 w-full bg-white rounded-t-3xl bottom-0 px-3 py-6  translate-y-full">
        <LookingForDriver
         createRide={createRide}
         pickup={pickup}
         destination={destination}
         fare={fare}
         vehicleType={vehicleType}
        setvehicleFound={setVehicleFound}/>
      </div>

      <div  ref={waitingdriverRef} className="fixed z-10 w-full bg-white rounded-t-3xl bottom-0 px-3 py-6 translate-y-full">
        <WaitForDriver waitingdriver={waitingdriver} setwaitingdriver={setwaitingdriver}/>
      </div>
    </div>
  );
};

export default Home;
