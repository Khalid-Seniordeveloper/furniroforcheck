'use client';
import React, { useEffect, useState } from "react";
import createClient from "@sanity/client";
import Link from "next/link";
import Card from '../Component/Card/Card';

const sanity = createClient({
  projectId: "tzca0taz",
  dataset: "production",
  apiVersion: "2023-01-01",
  useCdn: true,
});

const ProductCards = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const fetchProducts = async () => {
    try {
      const query = `
        *[_type == "product"] | order(_createdAt desc) {
          _id,
          title,
          price,
          discountPercentage,
          "imageUrl": productImage.asset->url,
          description,
          "tags": tags
        }
      `;
      const data = await sanity.fetch(query);
      setAllProducts(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const totalPages = Math.ceil(allProducts.length / productsPerPage);

  const paginatedProducts = allProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <main className="p-4">

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full border-t-4 border-blue-500 h-16 w-16"></div>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedProducts.map((product) => (
              <div key={product._id} className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
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

          {/* Pagination */}
          <div className="flex flex-wrap justify-center mt-10 gap-4 sm:gap-6">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex justify-center items-center transition duration-300 cursor-pointer shadow-md text-base md:text-lg 
                  ${currentPage === i + 1 ? 'bg-[#B88E2F] text-white' : 'bg-[#F9F1E7] text-black hover:bg-[#E6D6B0]'}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`w-20 h-10 sm:w-24 sm:h-12 rounded-lg flex justify-center items-center transition duration-300 cursor-pointer shadow-md text-base md:text-lg 
                bg-[#F9F1E7] text-black hover:bg-[#E6D6B0] 
                ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default ProductCards;
