'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { toast } from 'sonner';

type Contact = {
  _id: string;
  name: string;
  email: string;
  number: string;
  message: string;
  status?: 'pending' | 'done';
  createdAt?: string;
};

export default function ContactDetails() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch('/api/contact');
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || 'Failed to load contacts');
        setContacts(data.messages);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete contact');

      setContacts((prev) => prev.filter((c) => c._id !== id));
      toast.success(`Deleted contact: ${name}`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unexpected error';
      toast.error(message);
    }
  };

  const handleDone = async (id: string) => {
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'done' }),
      });

      if (!res.ok) throw new Error('Failed to update contact');

      setContacts((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status: 'done' } : c))
      );
      toast.success('Marked as done');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unexpected error';
      toast.error(message);
    }
  };

  return (
    <div className="p-6 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-[#2d386a]">Contact Messages</h2>
          <p className="text-sm text-gray-500">
            View and manage all contact form submissions.
          </p>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-x-auto h-auto">
        <div className="px-4 py-3 border-b">
          <h4 className="text-base font-semibold text-gray-800">Contact Form Submissions</h4>
          <p className="text-xs text-gray-500">Messages from users submitted via the contact form.</p>
        </div>

        {loading ? (
          <div className="p-6 text-sm text-gray-500">Loading contact messages...</div>
        ) : error ? (
          <div className="p-6 text-red-500 text-sm">Error: {error}</div>
        ) : contacts.length === 0 ? (
          <div className="p-6 text-sm text-gray-500">No contact messages found.</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 text-xs text-left text-gray-600 uppercase">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Number</th>
                <th className="p-3">Message</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((row, i) => (
                <tr
                  key={row._id}
                  className={clsx(
                    'hover:bg-gray-50 text-sm transition-all',
                    row.status === 'done'
                      ? 'bg-green-50 text-green-700'
                      : 'text-gray-800'
                  )}
                >
                  <td className="p-3">CM{i + 1}</td>
                  <td className="p-3">{row.name}</td>
                  <td className="p-3">{row.email}</td>
                  <td className="p-3">{row.number}</td>
                  <td className="p-3">{row.message}</td>
                  <td className="p-3 space-x-2 flex flex-wrap">
                    {row.status !== 'done' && (
                      <button
                        onClick={() => handleDone(row._id)}
                        className="px-2 py-1 bg-black-100 text-white-700 text-xs rounded"
                      >
                        Mark as Done
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(row._id, row.name)}
                      className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
