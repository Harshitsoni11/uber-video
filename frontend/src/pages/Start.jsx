import React from 'react'
import { Link } from 'react-router-dom'


const Start = () => {
  return (
    <div>
      <div className=' bg-cover bg-center bg-[url("https://images.unsplash.com/photo-1593950315186-76a92975b60c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dWJlcnxlbnwwfHwwfHx8MA%3D%3D")] h-screen pt-5 w-full flex justify-between flex-col'>
        <img className='w-16 ml-8 ' src='https://static1.squarespace.com/static/5bde0f00c3c16aa95581e2e2/62b4cb1add9d257dd43bb03d/62b652bd5f15b96e6dbd1aa1/1656115924895/uber+logo+white.png?format=1500w' alt=''></img>
        <div className='bg-white pb-7 py-4 px-4'>
            <h2 className='text-3xl font-bold'>Get Started with User</h2>
            <Link to={'/login'} className=' flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'>Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Start
