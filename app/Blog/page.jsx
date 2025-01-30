"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import b1 from '../assets/b1.jpg';
import b2 from '../assets/b2.jpg';
import b3 from '../assets/b3.jpg';
import b4 from '../assets/b4.jpg';
import b5 from '../assets/b5.jpg';
import b6 from '../assets/b6.jpg';
import shopbanner from '../assets/shopbanner.png';


const BlogLayout = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  const allBlogPosts = [
    {
      id: 1,
      title: "Going all-in with millennial design",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium...",
      image: b1,
      date: "12 Jan 2024",
      category: "Design"
    },
    {
      id: 2,
      title: "Exploring new ways of decorating",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium...",
      image: b2,
      date: "10 Jan 2024",
      category: "Decorating"
    },
    {
      id: 3,
      title: "Handmade pieces that took time to make",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium...",
      image:    b3,
      date: "8 Jan 2024",
      category: "Handmade"
    },
    {
      id: 4,
      title: "Creative workspace setup ideas",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium...",
      image: b4,
      date: "6 Jan 2024",
      category: "Workspace"
    },
    {
      id: 5,
      title: "Modern minimalist approach",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium...",
      image: b5,
      date: "4 Jan 2024",
      category: "Design"
    },
    {
      id: 6,
      title: "DIY home organization",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium...",
      image: b6,
      date: "2 Jan 2024",
      category: "DIY"
    }
  ];

  const recentPosts = [
    {
      id: 1,
      title: "Going all-in with millennial design",
      image: b2,
    },
    {
      id: 2,
      title: "Exploring new ways of decorating",
      image: b6,
    },
    {
      id: 3,
      title: "Something special",    
      image: b5,
    },
    {
      id: 4,
      title: "Quick tips & tricks",
      image: b3
    }
  ];

  const categories = [
    { name: "Design", count: 5 },
    { name: "Creativity", count: 3 },
    { name: "Handmade", count: 2 },
    { name: "Various", count: 4 }
  ];

  const totalPages = Math.ceil(allBlogPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allBlogPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
         <div 
        className="relative w-full h-64 bg-cover bg-center" 
        style={{ backgroundImage: `url(${shopbanner.src})` }}
      >
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black titleshop text-4xl font-bold">
          Blogs
        </h1>
      </div>

    <div className="max-w-full mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content - Increased width for blog section */}
        <div className="lg:w-full xl:w-4/5">
          {currentPosts.map(post => (
            <article key={post.id} className="mb-20">
              <div className="relative w-full h-[49rem] mb-8">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="flex items-center gap-4 text-[1.5rem] text-gray-600 mb-4">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {post.date}
                </span>
                <span>•</span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" vewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  {post.category}
                </span>
              </div>
              <h2 className="text-[2rem] font-bold mb-6">{post.title}</h2>
              <p className="text-[1.7rem] text-gray-600 mb-6 leading-relaxed">{post.excerpt}</p>
              <button className="text-lg text-gray-700 font-medium hover:text-blue-600 transition-colors">
                Read more
              </button>
            </article>
          ))}

          <div className="flex justify-center text-[2rem] mt-16 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded ${
                  currentPage === page
                    ? 'bg-amber-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {page}
              </button>
            ))}
            {currentPage < totalPages && (
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-6 py-4 rounded bg-gray-100 text-gray-700 text-[2rem] hover:bg-gray-200"
              >
                Next
              </button>
            )}
          </div>
        </div>

        {/* Sidebar - Decreased width */}
        <div className="lg:w-full xl:w-1/4">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-[1.7rem]"
              />
              <button className="absolute right-2 top-2">
                <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Categories - Decreased size */}
          <div className="mb-8">
            <h3 className="text-[2.2rem] font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map(category => (
                <li 
                  key={category.name}
                  className="flex justify-between items-center py-1.5 border-b border-gray-100"
                >
                  <span className=" text-gray-700 text-[1.7rem]">{category.name}</span>
                  <span className="text-xs text-gray-500  text-[2.1rem]">{category.count}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Posts - Adjusted size */}
          <div>
            <h3 className="text-[2.3rem] font-bold mb-4">Recent Posts</h3>
            <div className="space-y-4">
              {recentPosts.map(post => (
                <div key={post.id} className="flex gap-3">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={100}
                    height={100}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <h4 className="text-[1.5rem] font-medium text-gray-700 hover:text-blue-600 cursor-pointer">
                    {post.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default BlogLayout;