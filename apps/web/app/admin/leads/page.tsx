import Link from 'next/link';
import { cookies } from 'next/headers';
import { bffUrl } from '../../../lib/api';

async function getLeads() {
  const cookie = (await cookies()).toString();
  const res = await fetch(`${bffUrl}/api/v1/leads`, { headers: { Cookie: cookie }, cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default async function AdminLeadsPage() {
  const leads = await getLeads();
  return (
    <main className="container">
      <h1 className="text-2xl font-bold mb-4">Leads</h1>
      <ul className="space-y-2">
        {leads.map((lead: any) => (
          <li key={lead.id} className="border p-3 rounded bg-white">
            <Link href={`/admin/leads/${lead.id}`} className="font-semibold">{lead.customerName}</Link>
            <p>{lead.serviceType} · {lead.status}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
