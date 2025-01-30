'use client'; // This ensures the component is client-side

import { useState } from 'react';
import { auth } from '../Firebas/config.js'; // Adjust the path as needed
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation'; // Correct import for App Router
import Link from 'next/link.js';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); // Using useRouter inside a client-side component

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/signin'); // Redirect after successful signup
    } catch (err) {
      setError('Error signing up');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">Sign Up</button>
        </form>
        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link href="/signin" className="text-blue-500 hover:underline"> Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;