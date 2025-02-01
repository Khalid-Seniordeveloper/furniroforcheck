import React from 'react'
import shopbanner from '../assets/shopbanner.png'
import map from '../assets/map.png'
import Vector from '../assets/Vector.png'
import  clock from '../assets/clock.png'
import trophy from '../assets/trophy.png'
import guarantee from '../assets/guarantee.png'
import contact from '../assets/contact.png'

import hand from '../assets/hand.png'


import Image from 'next/image'
const Contact = () => {
  return (
<>
<div 
      className="relative w-full h-64 bg-cover bg-center" 
      style={{ backgroundImage: `url(${shopbanner.src})` }}
    >
      <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black titleshop text-4xl font-bold">
        Contact
      </h1>
</div>


<div className='touch text-center mt-20'>
<h2>Get in touch with us</h2>
<p className='text-[#9F9F9F]'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed, saepe culpa! <br /> Eum magni laboriosam voluptatem et ipsum, iure nam vero.</p>

</div>

<div className='w-[100%] h-[60rem] flex mt-[8rem] main-sub-contact'>


<div className='w-[50%] h-[100%] sub-contact'>

    <div className='flex sub-contact-one'>

<div><Image src={map}/></div><h1>Addresses <br /> <span>236 5th SE Avenue, New York NY10000,United States</span></h1>
    </div>
   
    <div className='flex sub-contact-one'>

<div><Image src={Vector}/></div><h1>Phone <br /> <span>Mobile: +(84) 546-6789 <br />
Hotline: +(84) 456-6789</span></h1>
    </div>


    <div className='flex sub-contact-one'>

<div><Image src={clock}/></div><h1>Working Time <br /> <span>Monday-Friday: 9:00 - 22:00 <br />
Saturday-Sunday: 9:00 - 21:00</span></h1></div>



</div>





<div className='w-[50%] h-[100%] flex flex-col field-container  gap-12'>

<div>
<label className='field-name'>Your Name</label> <br /> <br />
<input type="text" className='w-[27rem] rounded-[1rem] p-8 field' placeholder='A  B  C' />

</div>

<div>
<label className='field-name'>Email Addres</label> <br /> <br />
<input type="email" className='w-[27rem] rounded-[1rem] p-8 field' placeholder='ABC@gmail.com'/>

</div>


<div>
<label className='field-name'>Subject</label> <br /> <br />
<input type="text" className='w-[27rem] rounded-[1rem] p-8 field' placeholder='This is an optional' />

</div>


<div>
<label className='field-name'>Message</label> <br /> <br />
<textarea className='field-t h-[17rem]' placeholder='Enter Your Message Here'></textarea>

</div>

<div><button className='subscribe'>Submit</button></div>
</div>

</div>
<div className='w-[100%] h-[26rem] bg-[#FAF3EA] flex promote-container justify-center orneechy items-center gap-24 mt-16'>

<div className='flex gap-[0.9rem]'>
  <Image src={trophy}/>
<div className='shop-description'>
<h1>High Quaity</h1>
<p>Crafted From Top Material</p>
</div>
</div>

<div className='flex gap-[0.9rem]'>
  <Image src={guarantee}/>
<div className='shop-description'>
<h1>Warranty Protection</h1>
<p>Over 2 Years</p>
</div>
</div>


<div className='flex gap-[0.9rem]'>
  <Image src={hand}/>
<div className='shop-description'>
<h1>Free Shipping</h1>
<p>Order Over 150$</p>
</div>
</div>


<div className='flex gap-[0.9rem]'>
  <Image src={contact}/>
<div className='shop-description'>
<h1>24 / 7 Support</h1>
<p>Dedicated Support</p>
</div>
</div>



</div>

</>
  )
}

export default Contact