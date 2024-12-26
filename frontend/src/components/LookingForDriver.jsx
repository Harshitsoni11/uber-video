import React from 'react'

const LookingForDriver = (props) => {
  return (
    <div>
    <div className="flex justify-between ">
    <h2 className="text-2xl font-semibold mb-5">Looking for Driver</h2>
    <h5
    onClick={() => props.setvehicleFound(false)}
  >
    <i className="ri-arrow-down-wide-line"></i>
  </h5>
    </div>
  

  <div className="flex gap-2 justify-between items-center flex-col">
    <img
      className="h-[170px]"
      src="https://i.pinimg.com/originals/8d/21/7b/8d217b1000b642005fea7b6fd6c3d967.png"
    />
    <div className="w-full">
      <div className="flex items-center gap-5 p-3 border-b-2">
        <i className="ri-map-pin-5-fill"></i>
        <div>
          <h3 className="text-lg font-medium">562/11-A</h3>
          <p className="text-sm -mt-1 text-gray-500">
            {props.pickup}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-5 p-3 border-b-2">
      <i className="ri-map-pin-user-fill"></i>
        <div>
          <h3 className="text-lg font-medium">562/11-A</h3>
          <p className="text-sm -mt-1 text-gray-500">
            {props.destination}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-5 p-3">
      <i className="ri-currency-fill"></i>
        <div>
          <h3 className="text-lg font-medium">₹{props.fare[props.vehicleType]}</h3>
          <p className="text-sm -mt-1 text-gray-500">
           Cash Cash
          </p>
        </div>
      </div>
    </div>
  </div>

 
</div>
  )
}

export default LookingForDriver
