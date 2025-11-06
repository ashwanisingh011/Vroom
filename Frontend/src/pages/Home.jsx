import React, {useState} from 'react'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div>
      <div className='bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1619059558110-c45be64b73ae?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-8 flex justify-between flex-col w-full bg-red-400'>
      <img className='ml-8 w-14' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"/>
        <div className='bg-white py-4 px-4'>
          <h1 className='text-3xl font-bold'>Welcome to Vroom!</h1>
          <Link to='/login' className='flex items-center justify-center w-full bg-black text-white rounded mt-5 py-3'>Continue </Link>
        </div>
      </div>
    </div>
  )
}

export default Home