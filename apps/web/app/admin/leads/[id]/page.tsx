'use client';

import { useEffect, useState } from 'react';
import { bffUrl } from '../../../../lib/api';

export default function LeadDetailPage({ params }: { params: { id: string } }) {
  const [lead, setLead] = useState<any>(null);
  const [draft, setDraft] = useState<{ subject: string; body: string } | null>(null);

  useEffect(() => {
    fetch(`${bffUrl}/api/v1/leads/${params.id}`, { credentials: 'include' }).then((r) => r.json()).then(setLead);
  }, [params.id]);

  async function updateStatus(status: string) {
    const res = await fetch(`${bffUrl}/api/v1/leads/${params.id}`, {
      method: 'PATCH', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }),
    });
    setLead(await res.json());
  }

  async function setFollowUpAt(followUpAt: string) {
    const res = await fetch(`${bffUrl}/api/v1/leads/${params.id}`, {
      method: 'PATCH', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ followUpAt }),
    });
    setLead(await res.json());
  }

  async function generateDraft() {
    const res = await fetch(`${bffUrl}/api/v1/leads/${params.id}/draft-quote`, { method: 'POST', credentials: 'include' });
    setDraft(await res.json());
  }

  async function sendDraft() {
    if (!draft || !lead?.contactEmail) return;
    await fetch(`${bffUrl}/api/v1/leads/${params.id}/messages`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...draft, sentTo: lead.contactEmail }),
    });
  }

  if (!lead) return <main className="container">Loading...</main>;

  return (
    <main className="container space-y-4">
      <h1 className="text-2xl font-bold">{lead.customerName}</h1>
      <p>{lead.description}</p>
      <div className="flex gap-2">
        {['new', 'contacted', 'quoted', 'won', 'lost'].map((status) => (
          <button key={status} onClick={() => updateStatus(status)}>{status}</button>
        ))}
      </div>
      <input type="datetime-local" onChange={(e) => setFollowUpAt(new Date(e.target.value).toISOString())} />
      <button onClick={generateDraft}>Generate Draft Quote</button>
      {draft && (
        <div className="bg-white border p-4 rounded space-y-2">
          <h2 className="font-semibold">{draft.subject}</h2>
          <pre className="whitespace-pre-wrap">{draft.body}</pre>
          <button onClick={sendDraft}>Send Draft</button>
        </div>
      )}
    </main>
  );
}
