import React from "react";
import {Link} from 'react-router-dom'

const Riding = () => {
  return (
    
      <div className="h-screen">
        <Link to="/home" className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full">
        <i className="text-lg font-semibold ri-home-line"></i>
        </Link>
        <img
          className="h-[1/2] object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
        ></img>
        <div className="h-1/2 p-4">
          <div className="flex items-center justify-between">
            <img
              className="h-20"
              src="https://i.pinimg.com/originals/8d/21/7b/8d217b1000b642005fea7b6fd6c3d967.png"
            ></img>
            <div className="text-right">
              <h2 className="text-lg font-medium">Sartak</h2>
              <h4 className="text-xl font-semibold">MP04 AB 1234</h4>
              <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
            </div>
          </div>

          <div className="flex gap-2 justify-between items-center flex-col">
            <div className="w-full">
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
                  <p className="text-sm -mt-1 text-gray-500">Cash Cash</p>
                </div>
              </div>
            </div>
          </div>
          <button className="bg-green-600 text-white py-2 px-4 rounded-full w-full text-center">
            Make a Payment
          </button>
        </div>
      </div>

  );
};

export default Riding;
