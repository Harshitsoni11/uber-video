import React, { useState,useRef } from "react";
import { Link } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { useEffect,useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { CaptianDataContext } from "../context/CaptainContext";


const CaptainHome = () => {


  const [ridePopupPanel, setridePopupPanel] = useState(true)
  const [confirmridePopupPanel, setconfirmridePopupPanel] = useState(false)
  const RidepopupPanelRef = useRef(null)
  const confirmRidePopupPanelRef = useRef(null)

  const {socket}=useContext(SocketContext);
  const {captain}=useContext(CaptianDataContext);

 
  useEffect(() => {
    socket.emit('join', {
        userId: captain._id,
        userType: 'captain'
    })
    const updateLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {

                socket.emit('update-location-captain', {
                    userId: captain._id,
                    location: {
                        ltd: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                })
            })
        }
    }

    const locationInterval = setInterval(updateLocation, 10000)
    updateLocation()

    // return () => clearInterval(locationInterval)
}, [])

  useGSAP(() => {
    if(ridePopupPanel){
      gsap.to(RidepopupPanelRef.current, {
        transform:'translateY(0%)'
      })
    }else{
      gsap.to(RidepopupPanelRef.current, {
        transform:'translateY(100%)'
      })
    }
   
  },[ridePopupPanel])

  useGSAP(() => {
    if(confirmridePopupPanel){
      gsap.to(confirmRidePopupPanelRef.current, {
        transform:'translateY(0%)'
      })
    }else{
      gsap.to(confirmRidePopupPanelRef.current, {
        transform:'translateY(100%)'
      })
    }
   
  },[confirmridePopupPanel])
  return (
    <div className="h-screen">
      <Link
        to="/home"
        className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full"
      >
        <i className="text-lg font-semibold ri-logout-box-r-line"></i>
      </Link>
      <img
        className="h-[1/2] object-cover"
        src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
      ></img>
      <div className="h-1/2 p-5 rounded-t-3xl">
          <CaptainDetails/>
      </div>

      <div ref={ RidepopupPanelRef } className="fixed z-10 w-screen bg-white rounded-t-3xl bottom-0 translate-y-full px-3 py-6">
         <RidePopUp setridePopupPanel={setridePopupPanel} setconfirmridePopupPanel={setconfirmridePopupPanel}/>
      </div>

      <div ref={ confirmRidePopupPanelRef } className="fixed h-screen z-10 w-screen bg-white rounded-t-3xl bottom-0 translate-y-full px-3 py-6">
         <ConfirmRidePopUp setridePopupPanel={setridePopupPanel} setconfirmridePopupPanel={setconfirmridePopupPanel}/>
      </div>
    </div>
  );
};

export default CaptainHome;
