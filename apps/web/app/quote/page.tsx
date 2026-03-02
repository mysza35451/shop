'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { bffUrl } from '../../lib/api';

export default function QuotePage() {
  const [form, setForm] = useState({
    customerName: '',
    contactEmail: '',
    contactPhone: '',
    postcode: '',
    serviceType: 'other',
    preferredDate: '',
    description: '',
  });
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    await fetch(`${bffUrl}/api/v1/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, photoUrls: [], preferredDate: form.preferredDate || undefined }),
    });
    router.push('/quote/success');
  }

  return (
    <main className="container">
      <h1 className="text-2xl font-bold mb-4">Request a Quote</h1>
      <form className="space-y-3" onSubmit={submit}>
        <input placeholder="Name" required onChange={(e) => setForm({ ...form, customerName: e.target.value })} />
        <input placeholder="Email" type="email" onChange={(e) => setForm({ ...form, contactEmail: e.target.value })} />
        <input placeholder="Phone" onChange={(e) => setForm({ ...form, contactPhone: e.target.value })} />
        <input placeholder="Postcode" required onChange={(e) => setForm({ ...form, postcode: e.target.value })} />
        <select onChange={(e) => setForm({ ...form, serviceType: e.target.value })}>
          <option value="flooring">flooring</option><option value="plumbing">plumbing</option><option value="gardening">gardening</option><option value="other">other</option>
        </select>
        <input type="date" onChange={(e) => setForm({ ...form, preferredDate: e.target.value })} />
        <textarea placeholder="Describe the work needed" required onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
