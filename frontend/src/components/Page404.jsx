import React from 'react'
import NavBar from './shared/NavBar';

const Page404 = () => {
  return (
    <div>
      <NavBar/>
      <div className='flex justify-center h-100'>
        <img src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg" alt="" />
      </div>
      <div className='flex items-center justify-center'>
        <h1 className='font-bold text-3xl justify-center'><span className='text-[#d01e1e]'>Oops!</span> This is awkward... you are looking for <br /> 
          <span className='flex justify-center'>something that doesn't actually exist</span>
        </h1>
      </div>
    </div>
  )
}

export default Page404;
