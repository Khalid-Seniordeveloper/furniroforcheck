"use client";

import React, { useState, useEffect } from "react";
import createClient from "@sanity/client";

const sanityClient = createClient({
  projectId: "tzca0taz",
  dataset: "production",
  apiVersion: "2023-01-01",
  useCdn: false,
  token: "skFTF0aOQjpxsmony55U5j0nkski58RHOvqdLXvjHU5Dbhj7WYTmWZu7HxAvLgxGkbChXp69BFPlFClfF9gZxs89EMS5W7GIi0iTL5Oa7VNUpnbA8xmmZmVoU6LZXUWoNjcJhHKRUACQXYnLnc8TfFdkwKMV9BhZOPmhuTPUynasyaY1mF7H",
});

function AdminPanel() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const query = `*[_type == "order"]{
        _id, email, totalPrice, status, orderDate, products[]->{title}
      }`;
      const result = await sanityClient.fetch(query);
      setOrders(result);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await sanityClient.patch(orderId, {
        set: { status: newStatus },
      });
      console.log("Order status updated successfully");
      fetchOrders(); // Refresh orders after update
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className="bg-[#f9f1e7] min-h-screen p-10">
      <h1 className="text-4xl font-bold text-center text-white bg-[#B88E2F] py-6 rounded-lg">
        Admin Panel - Order Management
      </h1>
      <div className="overflow-x-auto mt-8">
        <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-[#B88E2F] text-white text-lg">
              <th className="p-4 text-left">Order ID</th>
              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">Products</th>
              <th className="p-4 text-left">Total Price</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Order Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={order._id}
                className={`border-b ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
              >
                <td className="p-4">{order._id}</td>
                <td className="p-4">{order.email}</td>
                <td className="p-4">{order.products?.map((p) => p.title).join(", ")}</td>
                <td className="p-4 font-bold">Rs {order.totalPrice}</td>
                <td className="p-4">
                  <select
                    className="p-2 border rounded-lg bg-white"
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="p-4">{new Date(order.orderDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPanel;
