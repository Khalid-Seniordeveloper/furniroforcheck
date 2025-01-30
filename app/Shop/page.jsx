"use client"

import React, { useState } from 'react';
import shopbanner from '../assets/shopbanner.png';
import filterimage from '../assets/filter.png';
import Image from 'next/image';
import shop1 from '../assets/shop1.png';
import shop2 from '../assets/shop2.png';
import line from '../assets/line.png';
import trophy from '../assets/trophy.png';
import guarantee from '../assets/guarantee.png';
import contact from '../assets/contact.png';
import hand from '../assets/hand.png';
import ProductCards from '../Product/page';

const Shop = () => {
  const [selectedPrice, setSelectedPrice] = useState('');

  const handlePriceFilterChange = (price) => {
    setSelectedPrice(price);
  };

  return (
    <>
      <div 
        className="relative w-full h-64 bg-cover bg-center" 
        style={{ backgroundImage: `url(${shopbanner.src})` }}
      >
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black titleshop text-4xl font-bold">
          Shop
        </h1>
      </div>

      <div className='w-[100%] h-[6rem] bg-[#F9F1E7] flex main-shop-container'>
        <div className='shop-one-container flex w-[50%]  h-[100%] justify-start items-center pl-40 gap-12 '>
          <Image src={filterimage} className='w-[2rem] h-[50%]' />
          <h1>Filter</h1>
          <Image src={shop1} className='w-[2rem] h-[30%]' />
          <Image src={shop2} className='w-[2rem] h-[30%]' />
          <Image src={line} className="line" />
          <h2 className='showw'>Showing 1-16 of 32</h2>
        </div>

        <div className='w-[50%] h-[100%] shop-two-container flex justify-center items-center gap-10'>
          <h1>Price Check</h1>
          <div className='btn flex justify-center items-center'>
            <select
              className="p-2 border rounded text-[1.5rem]"
              onChange={(e) => handlePriceFilterChange(e.target.value)}
            >
              <option value="">Select Price</option>
              <option value="100">Up to 100</option>
              <option value="200">Up to 200</option>
              <option value="300">Up to 300</option>
              <option value="400">Up to 400</option>
              <option value="500">Up to 500</option>
            </select>
          </div>
        </div>
      </div>

      {/* cards */}
      <div className='main-all-card-container-api flex  justify-center gap-11 mt-12'>
  
  <ProductCards/>
  </div>

      <div className='w-[100%] h-[26rem] bg-[#FAF3EA] flex promote-container justify-center items-center gap-24 mt-16'>
        <div className='flex gap-[0.9rem]'>
          <Image src={trophy} />
          <div className='shop-description'>
            <h1>High Quality</h1>
            <p>Crafted From Top Material</p>
          </div>
        </div>

        <div className='flex gap-[0.9rem]'>
          <Image src={guarantee} />
          <div className='shop-description'>
            <h1>Warranty Protection</h1>
            <p>Over 2 Years</p>
          </div>
        </div>

        <div className='flex gap-[0.9rem]'>
          <Image src={hand} />
          <div className='shop-description'>
            <h1>Free Shipping</h1>
            <p>Order Over 150$</p>
          </div>
        </div>

        <div className='flex gap-[0.9rem]'>
          <Image src={contact} />
          <div className='shop-description'>
            <h1>24 / 7 Support</h1>
            <p>Dedicated Support</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
