import React, { useRef,useState } from "react";
import { Link } from "react-router-dom";
import FinishRide from "../components/FinishRide";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const CaptionRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);

  useGSAP(() => {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        transform: "translateY(10%)",
      });
    } else {
      gsap.to(finishRidePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [finishRidePanel]);

  return (
    <div className="h-screen bg-gray-200">
      <Link
        to="/home"
        className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full"
      >
        <i className="text-lg font-semibold ri-logout-box-r-line"></i>
      </Link>
      <img
        className="h-[80%] object-cover"
        src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
      ></img>
      <div className="h-[20%] bg-yellow-400 rounded-t-3xl" >
        <div className="w-full flex items-center justify-center">
          <h5  onClick={()=>{
        console.log("true");
        setFinishRidePanel(true);
      }}>
            <i className=" text-xl font-semibold ri-arrow-up-wide-line"></i>
          </h5>
        </div>

        <div className=" p-5 flex justify-between items-center bg-yellow-400">
          <h4 className="text-xl">4 KM away</h4>
          <button className="bg-green-600 text-white font-semibold p-3 px-10 rounded-lg">
            Complete Ride
          </button>
        </div>
        <div
          ref={finishRidePanelRef}
          className="fixed h-screen z-10 w-screen bg-white rounded-t-3xl bottom-0 translate-y-full px-3 py-6"
        >
          <FinishRide setFinishRidePanel={setFinishRidePanel}/>
        </div>
      </div>
    </div>
  );
};

export default CaptionRiding;
