'use client';

import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { app } from '../Firebas/config.js'; // Your Firebase setup
import Image from 'next/image';
import createClient from "@sanity/client";

const sanity = createClient({
  projectId: "tzca0taz",
  dataset: "production",
  apiVersion: "2023-01-01",
  useCdn: false,
  token: "skFTF0aOQjpxsmony55U5j0nkski58RHOvqdLXvjHU5Dbhj7WYTmWZu7HxAvLgxGkbChXp69BFPlFClfF9gZxs89EMS5W7GIi0iTL5Oa7VNUpnbA8xmmZmVoU6LZXUWoNjcJhHKRUACQXYnLnc8TfFdkwKMV9BhZOPmhuTPUynasyaY1mF7H"
});

const CheckoutPage = () => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    phone: '',
  });
  const [total, setTotal] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    const auth = getAuth(app);
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      setFormData((prev) => ({
        ...prev,
        email: currentUser.email || '',
      }));
    }
  }, []);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (Number(item.price) * item.quantity), 0);
  };

  useEffect(() => {
    setTotal(calculateTotal());
  }, [cart]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const order = {
      userId: user?.uid || "",
      name: formData.name,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      phone: formData.phone,
      products: cart.map((item) => ({
        _type: 'reference',
        _ref: item._id,
      })),
      totalPrice: total,
      status: 'Pending',
      orderDate: new Date().toISOString(),
    };

    try {
      const orderResponse = await sanity.create({
        _type: 'order',
        ...order,
      });
      console.log('Order placed:', orderResponse);
    } catch (error) {
      console.error('Error placing order: ', error);
      alert('There was an error placing your order.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-600">Furniro - Checkout</h1>
        </div>
      </nav>

      {/* Welcome Message */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {user ? (
          <h2 className="text-2xl sm:text-3xl text-center font-semibold text-gray-700 mb-8">
            You are logged in as: <span className="text-blue-600">{user.email}</span>
          </h2>
        ) : (
          <h2 className="text-2xl sm:text-3xl text-center font-semibold text-gray-700 mb-8">
            Please sign in to proceed.
          </h2>
        )}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <div className="bg-white shadow-2xl rounded-lg p-6 sm:p-8 transition-all duration-300 ease-in-out hover:shadow-3xl">
          <h3 className="text-2xl font-bold text-gray-700 mb-6">Billing Details</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name and Phone */}
              <div>
                <label className="block text-lg font-semibold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                  required
                />
              </div>
              <div>
                <label className="block text-lg font-semibold mb-2">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              {/* Address and City */}
              <div>
                <label className="block text-lg font-semibold mb-2">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                  required
                />
              </div>
              <div>
                <label className="block text-lg font-semibold mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="mt-6">
              <label className="block text-lg font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                required
                disabled
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full ${
                isSubmitting ? 'bg-gray-600' : 'bg-indigo-600 hover:bg-indigo-700'
              } text-white py-4 text-xl rounded-lg transition duration-300 ease-in-out mt-8`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Placing Order...' : 'Place Order'}
            </button>
          </form>
        </div>

        {/* Cart Summary */}
        <div className="bg-white shadow-2xl rounded-lg p-6 sm:p-8">
          <h3 className="text-2xl font-bold text-gray-700 mb-6">Your Cart</h3>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-indigo-600 text-left text-white">
                <tr>
                  <th className="p-4 text-lg">Product</th>
                  <th className="p-4 text-lg hidden sm:table-cell">Price</th>
                  <th className="p-4 text-lg hidden sm:table-cell">Quantity</th>
                  <th className="p-4 text-lg hidden sm:table-cell">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50 transition-all duration-200">
                    <td className="p-4 flex items-center gap-4">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        width={80}
                        height={80}
                        className="object-cover rounded-md"
                      />
                      <div>
                        <h3 className="text-xl font-semibold">{item.title}</h3>
                        <p className="text-lg text-gray-600">Qty: {item.quantity}</p>
                      </div>
                    </td>
                    <td className="p-4 text-lg hidden sm:table-cell">
                      Rs {item.price ? Number(item.price).toFixed(2) : 'N/A'}
                    </td>
                    <td className="p-4 text-lg hidden sm:table-cell">{item.quantity}</td>
                    <td className="p-4 text-lg hidden sm:table-cell">
                      Rs {item.price ? (item.price * item.quantity).toFixed(2) : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cart Totals */}
          <div className="bg-indigo-50 p-6 mt-6 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-700 mb-4">Cart Totals</h3>
            <div className="flex justify-between mb-4 text-lg">
              <span>Subtotal:</span>
              <span>Rs {Number(total).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-2xl font-semibold text-indigo-600">
              <span>Total:</span>
              <span>Rs {Number(total).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;