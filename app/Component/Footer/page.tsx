import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div  className='w-[100%] h-[43rem] flex justify-center items-center gap-[12rem] footer-main-container p-12'>


    <div className='flex flex-col gap-[4rem] h-[100%] justify-start mt-[5rem] foter-list '>
      <ul>
        <li className='foot-logo'>Funiro</li>
        <li className='paraa'>Transform your home with our premium collection designed to elevate every space.</li>
    
      </ul>
    </div>
    
    <div className=' h-[100%] justify-center mt-[5rem] foter-list'>
      <ul className='flex flex-col gap-[4rem]'>
        <li className='paraa'>Links</li>
      <Link href="/">
      <li className='lists'>Home</li>
      </Link>
      <Link href="/Shop">
      <li className='lists'>Shop</li>
      </Link>
      <Link href="/Blog">
      <li className='lists'>Blog</li>
      </Link>
      <Link href="/Contact">
      <li className='lists'>Contact</li>
      </Link>    
     </ul>
    </div>
    
    
    

    
    
    <div className=' h-[100%] justify-center mt-[5rem] last'> 
      <ul className='flex flex-col gap-[4rem]'>
        <li className='paraa'>News Letters</li>
        <li><input type="text" placeholder='Enter Your Email Address' className='fieldf' /></li>
        <li><div className='name'>COMPLETE DEVELOP BY KHALID GOVERNER HOUSE SUNDAY 9 TO 12 AM ROLL NUMBER 172526</div></li>
     </ul>
    </div>
    
    
    
    </div>
  )
}

export default Footer