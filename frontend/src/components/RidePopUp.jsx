import React from 'react'

const RidePopUp = (props) => {
  return (
    <div>
        <div className="flex justify-between ">
        <h2 className="text-2xl font-semibold mb-2">New Ride Available</h2>
        <h5
        onClick={()=>{props.setridePopupPanel(false)}}
      >
        <i className="ri-arrow-down-wide-line"></i>
      </h5>
        </div>
        <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3 mt-2 mb-2'>
            <img className='h-10 w-12 rounded-full object-cover'></img>
            <h2 className='text-lg font-medium'>Harsh</h2>
        </div>
        <h5 className='text-lg font-semibold'>2.2 KM</h5>
        </div>
       <div className="flex gap-2 justify-between items-center flex-col">
        <div className="w-full">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-5-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-500">
                Kankariya Talab, Bhopal
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
          <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-500">
                Kankariya Talab, Bhopal
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
          <i className="ri-currency-fill"></i>
            <div>
              <h3 className="text-lg font-medium">₹193</h3>
              <p className="text-sm -mt-1 text-gray-500">
               Cash Cash
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <button onClick={() => {
           props.setconfirmridePopupPanel(true);
            }} className="w-full mt-5 bg-green-600 text-white font-semibold py-2 rounded-lg">
          Accept

        </button>
        <button  onClick={()=>{props.setridePopupPanel(false)}}
             className="w-full mt-2 bg-gray-200 text-black font-semibold py-2 rounded-lg">
          Ignore
        </button>
        </div>
    </div>
  )
}

export default RidePopUp
