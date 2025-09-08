'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  useEffect(() => {
    document.body.classList.add('no-admin-ui');
    return () => document.body.classList.remove('no-admin-ui');
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMsg('Email and password are required.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        router.push('/admin/dashboard');
      } else {
        const data = await res.json();
        setErrorMsg(data.message || 'Invalid credentials');
      }
    } catch (err) {
      console.log(err)
      setErrorMsg('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#2d386a]">Admin Login</h2>

        {errorMsg && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
            {errorMsg}
          </div>
        )}

        <input
          type="email"
          className="w-full border border-gray-300 mb-4 p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#2d386a]"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <input
          type="password"
          className="w-full border border-gray-300 mb-6 p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#2d386a]"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full py-3 cursor-pointer rounded font-medium text-white transition ${
            loading
              ? 'bg-[#2d386a]/60 cursor-not-allowed'
              : 'bg-[#2d386a] hover:bg-[#1f274f]'
          }`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </div>
  );
}
