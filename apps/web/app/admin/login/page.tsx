'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { bffUrl } from '../../../lib/api';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const response = await fetch(`${bffUrl}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (data.authenticated) {
      router.push('/admin/leads');
    } else {
      setError('Invalid credentials');
    }
  }

  return (
    <main className="container max-w-md">
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
      <form className="space-y-3" onSubmit={onSubmit}>
        <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="text-red-600">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </main>
  );
}
