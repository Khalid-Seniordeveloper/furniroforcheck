"use client"
import React from 'react'
import Banner from './Component/Banner/Banner'
import Image from 'next/image'
import imagep21 from './assets/imagep21.png'
import imagep22 from './assets/image22.png'
import imagep23 from './assets/imagw23.png'
import cardimage1 from './assets/image1C.png'
import cardimage2 from './assets/cardimage2.png'
import cardimage3 from './assets/cardimage3.png'
import cardimage4 from './assets/cardimage4.png'
import cardimage6 from './assets/cardimage6.png'
import cardimage7 from './assets/cardimage7.png'

import cardimage9 from './assets/cardimage9.png'

import Card from './Component/Card/Card'
import banner2p1 from './assets/banner2p1.png'
import banner2p2 from './assets/banner2p2.png'
import banner2p3 from './assets/banner2p3.png'
import banner2p4 from './assets/banner2p4.png'

import collage1 from './assets/collage1.png'
import collage2 from './assets/collage2.png'
import collage3 from './assets/collage3.png'
import collage4 from './assets/collage4.png'
import collage5 from './assets/collage5.png'
import collage6 from './assets/collage6.png'
import collage7 from './assets/collage7.png'
import collage8 from './assets/collage8.png'
import collage9 from './assets/collage9.png'

import mens from './assets/mens.png'
import women from './assets/womens.png'
import acc from './assets/acc.png'
import dis from './assets/dis.png'
import ProductCards from './Product/page'
const page = () => (
  <>
    <Banner />

    <h1 className='text-center range text-[2.5rem] mt-20'>Browse The Range</h1>
    <p className='text-center para'>Transform your home with our premium collection designed to elevate every space.</p>


<div>

</div>
    <div className='flex justify-center gap-12 mt-16  main-page-two-container'>
      <div className='flex flex-col items-center justify-center flex-wrap part-2-image kuch  hover'><Image src={imagep21} className='img2' />
        <h1>DINING</h1>
      </div>
      <div className='flex flex-col items-center justify-center part-2-image kuch hover'><Image src={imagep22} className="img2" />
        <h1>LIVING</h1>
      </div>  <div className='flex flex-col items-center justify-center part-2-image kuch hover'><Image src={imagep23} className="img2" />
        <h1>BEDROOM</h1>
      </div>
    </div>

    <h1 className='products'>Our Products</h1>
 
  
<div className='main-all-card-container-api flex  justify-center gap-11 mt-12'>
  
  <ProductCards/>
  </div>


    <div className='flex justify-center items-center mt-12'>
      <button className='more hover transition-[.5s]'>SHOW MORE</button></div>


    <div className='w-[100%] h-[40rem] bg-[#FCF8F3] flex mt-32 banner-two-main-container'>

      <div className='w-[35%] h-[100%] banner-two-one bg-white  flex flex-col justify-center pl-24 pr-16 gap-12'>
        <div className='banner-two-part'>
          <h1>50+ beautiful rooms Inspiration</h1>
          <p>Our designer already made a lot of beautiful prototipe of rooms that inspire you</p>
        </div>
        <div>
          <button className='explore'>Explore More</button>
        </div>
      </div>
      <div className='w-[65%] h-[100%] bg-[#FCF8F3] banner-two-two  flex gap-[2.5rem]'>
        <Image src={banner2p1} className='w-[25rem] hover start transition-[.5s]' />
        <Image src={banner2p2} className='w-[24rem] h-[36rem] ghyb2 hover start transition-[.5s]' />
        <Image src={banner2p3} className='w-[22rem] h-[32rem] ghyb hover start transition-[.5s]' />
        <Image src={banner2p4} className='h-[28rem] ghyb' />
      </div>
    </div>


<h1 className='college'>Share your setup with <br /> <span> #FuniroFurniture</span></h1>

    {/* collage part started  */}

    <div className='w-[100%] h-[55rem] flex collage-main-container'>

      {/* pehla div */}
      <div className='w-[40%] h-[100%] '>
        {/* uski uppper wali div */}
        <div className='w-[100%] h-[50%]  flex gap-[5%]'>
  {/* iske andar upper wali div  */}
  <Image src={collage1} className='h-[100%] one'/>
  <div className='flex justify-start items-end w-[80%]'>  <Image src={collage3} className='h-[90%] w-[95%] three' /></div>
     </div>

     <div className='w-[100%] h-[50%] flex gap-[3%]'>

<Image src={collage2} className='w-[30%] h-[90%] mt-4 two'/>
<Image src={collage4} className='w-[63%] h-[70%] mt-4 four'/>

     </div>
      </div>


      <div className='w-[20%] h-[100%] flex justify-center items-center'>
        <Image src={collage5} className='five'/>
      </div>
      <div className='w-[40%] h-[100%]'>
{/* pehli div */}
<div className='w-[100%] h-[50%]  flex gap-[8%] justify-end'>
  <Image src={collage6} className='w-[50%] h-[85%] mt-11'/>
  <Image src={collage8} className='w-[35%] h-[95%]'/>
</div>
<div className='w-[100%] h-[50]  flex gap-[5%]'>
<Image src={collage7} className='h-[70%] w-[35%] ml-8'/>
<Image src={collage9} className='h-[55%] w-[50%]' />
</div>
      </div>
    </div>
{/* footer  */}
  </>
)

export default page