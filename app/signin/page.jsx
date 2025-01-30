"use client";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "../Firebas/config.js"; 
import createClient from "@sanity/client";
import Login from "../Component/Login/Login.jsx";
import Link from "next/link.js";

// Sanity Client Setup
const sanity = createClient({
  projectId: "tzca0taz",
  dataset: "production",
  apiVersion: "2023-01-01",
  useCdn: false,
  token: "skFTF0aOQjpxsmony55U5j0nkski58RHOvqdLXvjHU5Dbhj7WYTmWZu7HxAvLgxGkbChXp69BFPlFClfF9gZxs89EMS5W7GIi0iTL5Oa7VNUpnbA8xmmZmVoU6LZXUWoNjcJhHKRUACQXYnLnc8TfFdkwKMV9BhZOPmhuTPUynasyaY1mF7H"
});

const Signin = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Optional, but we won't show errors on frontend

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        if (currentUser.email) {
          fetchOrders(currentUser.email);
        } else {
          setError("User email not found.");
        }
      } else {
        setUser(null);
        setOrders([]);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const fetchOrders = async (email) => {
    setLoading(true);
    setError(null);
    try {
      const query = `*[_type == "order" && email == $email]{
        _id, name, email, totalPrice, status, orderDate, products[]->{title}
      }`;
      const result = await sanity.fetch(query, { email });
      setOrders(result);
    } catch (error) {
      console.error("Error fetching orders:", error);
      // Set error but do not display it on frontend
      setError("Error fetching orders, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    const auth = getAuth(app);
    try {
      await signOut(auth);
      setUser(null);
      setOrders([]);
    } catch (error) {
      console.error("Error logging out:", error);
      setError("Error logging out, please try again.");
    }
  };

  if (!user) return <Login />;

  return (
    <div className="container mx-auto px-6 py-12 flex flex-col items-center">
      {/* Welcome Message */}
      <div className="text-center">
        <h2 className="text-5xl font-extrabold text-gray-800 animate-fadeIn">
          Welcome, <span className="text-[#B88E2F]">{user.email}</span> 👋
        </h2>
        <p className="text-2xl text-gray-600 mt-3">Here are your recent orders</p>
      </div>

      {/* Orders Table */}
      <div className="w-full max-w-4xl mt-10 bg-white shadow-lg rounded-xl overflow-hidden">
        <h3 className="text-3xl font-bold bg-[#B88E2F] text-white p-6 text-center">My Orders</h3>

        {loading ? (
          <p className="text-center py-6 text-gray-600 text-xl">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-center py-6 text-gray-600 text-xl">
            No orders found! Please go to shop and buy products.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-lg">
              <thead>
                <tr className="bg-gray-100 text-gray-700 uppercase text-xl">
                  <th className="border p-5 text-left">Order ID</th>
                  <th className="border p-5 text-left">Products</th>
                  <th className="border p-5 text-left">Total Price</th>
                  <th className="border p-5 text-left">Status</th>
                  <th className="border p-5 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr
                    key={order._id}
                    className={`border transition duration-300 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-[#B88E2F]`}
                  >
                    <td className="border p-5 font-semibold text-gray-700">{order._id}</td>
                    <td className="border p-5 text-gray-600">
                      {order.products?.map((p) => p.title).join(", ")}
                    </td>
                    <td className="border p-5 font-bold text-gray-800">Rs {order.totalPrice}</td>
                    <td className="border p-5">
                      <span
                        className={`px-4 py-2 rounded-full text-lg font-semibold tracking-wide ${
                          order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "Approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="border p-5 text-gray-600">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Logout Button */}
      <div className="mt-10 flex gap-[2rem]">
        <button
          onClick={handleLogout}
          className="py-4 px-10 bg-[#B88E2F] text-white text-2xl rounded-lg font-semibold shadow-lg hover:bg-[#9a6a1f] transition-transform transform hover:scale-105"
        >
          Logout
        </button>
        <Link href="/Shop">
          <button
            className="py-4 px-10 bg-[#B88E2F] text-white text-2xl rounded-lg font-semibold shadow-lg hover:bg-[#9a6a1f] transition-transform transform hover:scale-105"
          >
            Shop Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Signin;
