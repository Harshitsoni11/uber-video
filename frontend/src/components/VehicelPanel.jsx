import React from 'react'

const VehicelPanel = (props) => {
  return (
    <div>
      <h5 onClick={() => props.setvehiclePanel(false)} className="p-3 text-center absolute top-0 right-0 mt-3 "><i className="ri-arrow-down-wide-line"></i></h5>
        <h2 className="text-2xl font-semibold mb-5">Choose a Ride</h2>

        <div onClick={()=>{
            props.setconfirmRidePanel(true);
            props.selectVehicle("car");
        }} className="flex w-full mb-2 border-2 active:border-black rounded-xl p-3 justify-between items-center bg-white">
          <img className="h-20" src="https://i.pinimg.com/originals/8d/21/7b/8d217b1000b642005fea7b6fd6c3d967.png"/>
          <div className="w-1/2 ml-2">
            <h4 className="font-medium text-lg">UberGO <span><i className="ri-user-fill"></i>4</span></h4>
            <h5 className="font-medium text-sm">2 mins away</h5>
            <p className="font-normal text-xs text-gray-600">Affordable, compact rides</p>
          </div>
          <h2 className="text-2xl font-semibold">₹{props.fare.car}</h2>
        </div>

        <div onClick={()=>{
            props.setconfirmRidePanel(true);
            props.selectVehicle("motorcycle");
        }} className="flex w-full mb-2 border-2 active:border-black rounded-xl p-3 justify-between items-center bg-white">
          <img className="h-12" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"/>
          <div className=" ml-2 w-1/2">
            <h4 className="font-medium text-lg">UberBIke <span><i className="ri-user-fill"></i>1</span></h4>
            <h5 className="font-medium text-sm">2 mins away</h5>
            <p className="font-normal text-xs text-gray-600">Affordable, Bike rides</p>
          </div>
          <h2 className="text-2xl font-semibold">₹{props.fare.motorcycle}</h2>
        </div>

        <div onClick={() => {props.setconfirmRidePanel(true)
         props.selectVehicle("auto");
        }} className="flex w-full mb-2 border-2 active:border-black rounded-xl p-3 justify-between items-center bg-white">
          <img className="h-12" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"/>
          <div className=" ml-2 w-1/2">
            <h4 className="font-medium text-lg">UberAuto <span><i className="ri-user-fill"></i>3</span></h4>
            <h5 className="font-medium text-sm">2 mins away</h5>
            <p className="font-normal text-xs text-gray-600">Affordable, Auto rides</p>
          </div>
          <h2 className="text-2xl font-semibold">₹{props.fare.auto}</h2>
        </div>
    </div>
  )
}

export default VehicelPanel
