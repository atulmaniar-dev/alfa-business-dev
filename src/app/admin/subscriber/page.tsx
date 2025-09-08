'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Subscriber = {
    _id: string;
    email: string;
    createdAt: string;
};

export default function SubscriberPage() {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubscribers = async () => {
            try {
                const res = await fetch('/api/subscribe');
                const data = await res.json();
                setSubscribers(data.subscriptions); // assuming `subscriptions` array is returned
            } catch (err) {
                console.error('Failed to fetch subscribers', err);
            } finally {
                setLoading(false);
            }
        };

        fetchSubscribers();
    }, []);
    const router = useRouter();
    return (
        <div className="p-6">
            <div className="flex justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Subscribers</h1>
                    <p className="mt-1 text-gray-600 text-sm">
                        Manage your subscribers. View, add or remove subscribers from your mailing list.
                    </p>
                </div>
                 <button onClick={() => router.back()} className="text-sm px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded">
          ← Back
        </button>
            </div>



            <div className="mt-6">
                {loading ? (
                    <p>Loading...</p>
                ) : subscribers.length === 0 ? (
                    <p className="text-gray-500">No subscribers found.</p>
                ) : (
                    <table className="w-full mt-4 border border-gray-200 text-left text-sm">
                        <thead className="bg-gray-100 text-gray-600 uppercase">
                            <tr>
                                <th className="p-3 border-b">Email</th>
                                <th className="p-3 border-b">Subscribed At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subscribers.map((sub) => (
                                <tr key={sub._id} className="hover:bg-gray-50">
                                    <td className="p-3 border-b">{sub.email}</td>
                                    <td className="p-3 border-b">
                                        {new Date(sub.createdAt).toLocaleString()}
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
