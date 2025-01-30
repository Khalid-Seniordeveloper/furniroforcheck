"use client"
import { useState } from 'react';
import { auth, signInWithEmailAndPassword } from '../../Firebas/config.js';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);  // Add loading state
  const router = useRouter(); // Used to redirect the user after login

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);  // Set loading to true when login starts
    setError('');      // Reset error before each login attempt

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/signin'); // Redirect to the home page or protected page
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);  // Set loading to false when login completes (either success or failure)
    }
  };

  return (
    <div className="flex w-[100%] justify-center items-center min-h-screen bg-[#F9F1E7]">
      <div className="w-[30%] login-container p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-4xl font-bold  text-center mb-6">Login</h2>
        {error && <p className="text-red-500 text-xl">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-2xl font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="w-full mt-2 px-4 text-[1.2rem] py-[1.2rem] border border-gray-300 rounded-md"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-2xl font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="w-full mt-2 px-4 text-[1.2rem] py-[1.2rem] border border-gray-300 rounded-md"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit" 
            className={`w-full py-3 text-[1.6rem]  ${loading ? 'bg-[#F9F1E7] text-[#B88E2F] font-bold '  : 'bg-[#F9F1E7] font-bold'} text-[#B88E2F]  rounded-md hover:bg-[#F9F1E7]`} 
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-center text-xl">
          Don’t have an account?{' '}
          <a href="/signup" className="text-blue-500 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
