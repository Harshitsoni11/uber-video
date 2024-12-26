import React,{useContext} from 'react'
import { CaptianDataContext } from '../context/CaptainContext'



const CaptainDetails = () => {

  const {captain}=useContext(CaptianDataContext);

  return (
    <div>
       <div className="flex items-center justify-between">
          <div className="flex items-center justify-start gap-3">
            <img className="h-10 w-10" src=""></img>
            <h4 className="text-lg font-semibold capitalize">{captain.fullname.firstname+" "+captain.fullname.lastname}</h4>
          </div>
          <div>
            <h5 className="text-xl font-semibold">285.20</h5>
            <p className="text-sm text-gray-600">Earned</p>
          </div>
        </div>

        <div className="flex p-3 mt-3 bg-gray-50 rounded-xl justify-center gap-5 items-start">
          <div className="text-center">
            <i className="text-lg mb-2font-semibold ri-timer-2-line"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600">Hours Online</p>
          </div>

          <div className="text-center">
            <i className="text-lg mb-2 font-semibold ri-speed-up-line"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600">Hours Online</p>
          </div>

          <div className="text-center">
            <i className="text-lg mb-2 font-semibold ri-booklet-line"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600">Hours Online</p>
          </div>
        </div>
    </div>
  )
}

export default CaptainDetails
