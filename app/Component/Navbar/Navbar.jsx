'use client';
import Image from 'next/image';
import icon1 from '../../assets/icon1.png';
import icon2 from '../../assets/icon2.png'; // Search icon
import icon3 from '../../assets/icon3.png';
import icon4 from '../../assets/icon4.png';
import logo from '../../assets/logo.png';
import { FaBars, FaTimes } from "react-icons/fa";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../Firebas/config.js';
import Card from '../Card/Card.jsx';
import createClient from "@sanity/client";

const sanity = createClient({
  projectId: "tzca0taz",
  dataset: "production",
  apiVersion: "2023-01-01",
  useCdn: true,
});

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        if (user.email === "khalidadmin@gmail.com") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } else {
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = `
          *[_type == "product"] {
            _id, title, price, discountPercentage, "imageUrl": productImage.asset->url, description
          }
        `;
        const products = await sanity.fetch(query);
        setAllProducts(products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value === "") {
      setFilteredProducts([]);
      return;
    }

    const filtered = allProducts.filter(product =>
      product.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setSearchQuery("");
      setFilteredProducts([]);
    }
    setMenuOpen(false)
  };

  return (
    <div className="w-full h-36 main-container justify-center items-center flex gap-64 relative">
      <div className="flex items-center">
        <Image src={logo} className="w-60" alt="Logo" />
      </div>

      <div className={`nav-link ${menuOpen ? 'block' : 'hidden'} sm:block`}>
        <ul className="list-none text-[1.7rem] flex items-center gap-[5.8rem]">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/Shop">Shop</Link></li>
          <li><Link href="/Blog">Blog</Link></li>
          <li><Link href="/Contact">Contact</Link></li>
          {isAdmin && <li><Link href="/DashBoard">DashBoard</Link></li>}
        </ul>
      </div>

      <div>
        <ul className="flex items-center gap-[4rem] logo-div">
          <li><Link href="/signin"><Image src={icon1} className="w-[2rem]" /></Link></li>
          <li>
            <Image
              src={icon2}
              className="w-[2rem] cursor-pointer"
              onClick={handleSearchToggle}
            />
          </li>
          <li><Image src={icon3} className="w-[2rem]" /></li>
          {isLoggedIn && <li><Link href="/Cart"><Image src={icon4} className="w-[2rem]" /></Link></li>}
        </ul>
      </div>

      {/* Full-width Search Bar */}
      {isSearchOpen && (
        <div className="absolute top-[6rem] left-0 w-full bg-white p-4 shadow-md z-50">
          <div className="flex justify-between items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className="p-4 text-2xl w-[95%] bg-white rounded-md border shadow-md"
              placeholder="Search products..."
            />
            <FaTimes
              className="text-2xl cursor-pointer"
              onClick={handleSearchToggle}
            />
          </div>

          {/* Show search results below */}
          {filteredProducts.length > 0 && !loading && (
            <div className="mt-4 bg-white shadow-md max-h-[50rem] overflow-y-auto border rounded-lg p-4 z-50">
              <div className="flex overflow-x-auto gap-[2rem]">
                {filteredProducts.map((product) => (
                  <div key={product._id} className="min-w-[200px]">
                    <Link href={`/product/${product._id}`} legacyBehavior>
                      <a className="block">
                        <Card
                          src={product.imageUrl}
                          title={product.title}
                          description={product.description.slice(0, 15)}
                          price={product.price}
                          cutprice={product.price + (product.discountPercentage ? (product.price * product.discountPercentage / 100) : 0)}
                        />
                      </a>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {loading && (
            <div className="flex justify-center items-center mt-4">
              <div className="animate-spin rounded-full border-t-4 border-blue-500 h-16 w-16"></div>
            </div>
          )}
        </div>
      )}

      {/* Mobile Menu */}
      <div className="flex sm:hidden items-center" onClick={toggleMenu}>
        <FaBars className="text-4xl cursor-pointer" />
      </div>

      {/* Mobile menu with animation */}
      {menuOpen && (
        <div
          className={`absolute top-0 right-0 bg-[#B88E2F] w-[100%] mt-[8rem] max-w-[400px] h-auto p-6 z-50 transform transition-transform duration-500 ease-in-out ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex justify-end w-[100%]">
            <FaTimes
              className="text-white text-3xl cursor-pointer"
              onClick={toggleMenu}
            />
          </div>
          <ul className="text-[#F9F1E7] w-[100%] text-[1.7rem] mt-6 space-y-6">
            <li>
              <Link href="/" className="w-[100%]"  onClick={() => setMenuOpen(false)}>Home</Link>
            </li>
            <li>
              <Link href="/Shop" className=""  onClick={() => setMenuOpen(false)}>Shop</Link>
            </li>
            <li>
              <Link href="/Blog" className=""  onClick={() => setMenuOpen(false)}>Blog</Link>
            </li>
            <li>
              <Link href="/Contact" className=""  onClick={() => setMenuOpen(false)}>Contact</Link>
            </li>
            <li onClick={handleSearchToggle} className="" >
              Search Products
            </li>

            {/* Conditional rendering of login or profile link */}
            {isLoggedIn ? (
              <li>
                <Link href="/signin" className=""  onClick={() => setMenuOpen(false)}>See Profile</Link>
       

              </li>
            ) : (
              <li>
                <Link href="/signin" className=""  onClick={() => setMenuOpen(false)}>Login</Link>
              </li>
            )}
             {isLoggedIn ?(
               <li>
               <Link href="/checkout" className=""  onClick={() => setMenuOpen(false)}>Checkout</Link>
      

             </li>
             ) : (
              <li>
              <Link href="/signup" className=""  onClick={() => setMenuOpen(false)}>Signup</Link>
     

            </li>
              
             
             )}

            {isAdmin && (
              <li>
                <Link href="/DashBoard" className=""  onClick={() => setMenuOpen(false)}>Dashboard</Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
