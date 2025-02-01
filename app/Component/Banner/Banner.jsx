import React from 'react'
import Image from 'next/image'
import back from '../../assets/back.png'
const Banner = () => {
  return (
    <div className='backgroundContainer flex'>
    <div className='imageWrapper'>
      <Image 
        src={back} 
        alt="Background"
        layout="fill" 
        objectFit="cover" 
      />
    </div>
    <div className='content1'>
 
    </div> 
    <div className='content2 '>
<div className='sub-content  pl-8 pr-8  pt-24 ml-12'>
  <h1 className='text-3xl '>New Arrivals</h1>
  <h2 className='text-[5rem]'>Discover our <br/> New collection</h2> <br/>
  <p className='text-xl'>Transform your home with our premium collection designed to elevate every space.</p> <br/> <br/>
  <button className='btn-buy mt-7'>BUY NOW</button>
</div>
    </div>
  </div>
  )
}

export default Banner