'use client';

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "../../Firebas/config.js";
import createClient from "@sanity/client";

// Sanity Client Setup
const sanity = createClient({
  projectId: "tzca0taz",
  dataset: "production",
  apiVersion: "2023-01-01",
  useCdn: false,
  token: "skbOt8mSfFRj4DyUAIqx23Fyr1bToRRi486dOg36JC4UNhmX4Vazde1FdlgxbcoYcq5DnkW9wuCU9SNEWi7jH6nBabOpGcZC8RJCGK5mvqfW8TOI4IDYR6j9p",
});

const Userdashboard = () => {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const fetchOrders = async (email) => {
    setLoading(true);
    setError(null);

    try {
      const query = `*[_type == "order" && email == "${email}"]{
        _id, name, email, totalPrice, status, orderDate, products[]->{title}
      }`;
      const result = await sanity.fetch(query);
      setOrders(result);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Error fetching orders: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container mx-auto px-6 py-10">
        {/* Welcome Message */}
        {user && (
          <div className="flex flex-col items-center mb-10">
            <h2 className="text-5xl font-extrabold text-gray-800 text-center">
              Welcome, <span className="text-indigo-600">{user.displayName || user.email.split("@")[0]}</span> 👋
            </h2>
            <p className="text-2xl text-gray-600 mt-3">Here are your recent orders</p>
          </div>
        )}

        {/* Orders Table */}
        <div className="w-[90%] mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <h3 className="text-3xl font-bold bg-indigo-600 text-white p-6 text-center">
            My Orders
          </h3>

          {loading ? (
            <p className="text-center py-6 text-gray-600 text-xl">Loading orders...</p>
          ) : error ? (
            <p className="text-center py-6 text-red-600 text-xl">Error fetching orders: {error}</p>
          ) : orders.length === 0 ? (
            <p className="text-center py-6 text-gray-600 text-xl">No orders yet.</p>
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
                      } hover:bg-indigo-100`}
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
      </div>

      {user && (
        <div className="flex justify-center mt-10">
    
        
          
        </div>

      )}


<button

  className="py-4 px-8 bg-red-600 text-white text-2xl rounded-lg font-semibold shadow-lg hover:bg-red-700 transition-transform transform hover:scale-105"
>
  Shop Now
</button>



    </>
  );
};

export default Userdashboard;
