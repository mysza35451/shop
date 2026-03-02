import { cookies } from 'next/headers';
import { bffUrl } from '../../../lib/api';

export default async function RemindersPage() {
  const cookie = (await cookies()).toString();
  const res = await fetch(`${bffUrl}/api/v1/leads`, { headers: { Cookie: cookie }, cache: 'no-store' });
  const leads = res.ok ? await res.json() : [];
  const reminders = leads.filter((lead: any) => !!lead.followUpAt);

  return (
    <main className="container">
      <h1 className="text-2xl font-bold mb-4">Upcoming Follow-Ups</h1>
      <ul className="space-y-2">
        {reminders.map((lead: any) => (
          <li key={lead.id} className="bg-white border p-3 rounded">{lead.customerName} - {new Date(lead.followUpAt).toLocaleString()}</li>
        ))}
      </ul>
    </main>
  );
}
