'use client';

import {
  Calendar,
  MessageCircle,
  LayoutDashboard,
  Wallet,
  User,
  Image as ImageIcon,
  Star,
  Mail,
} from 'lucide-react';
import { FaPlus } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useRouter } from 'next/navigation';
const COLORS = ['#7e87f8', '#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

export default function DashboardPage() {
  const [stats, setStats] = useState({
    plans: 0,
    bookings: 0,
    tours: 0,
    messages: 0,
    amenities: 0,
    gallery: 0,
    subscribers: 0,
    testimonials: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentData, setRecentData] = useState({
    bookings: [],
    tours: [],
    messages: [],
    testimonials: [],
  });
  const router = useRouter();


  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);

        // Fetch all data in parallel
        const [
          plansRes,
          bookingsRes,
          toursRes,
          messagesRes,
          amenitiesRes,
          galleryRes,
          subscribersRes,
          testimonialsRes,
        ] = await Promise.all([
          fetch('/api/plans'),
          fetch('/api/book-tour'),
          fetch('/api/book-tour'),
          fetch('/api/contact'),
          fetch('/api/amenities'),
          fetch('/api/gallery'),
          fetch('/api/subscribe'),
          fetch('/api/testimonials'),
        ]);

        // Process responses
        const plansData = await plansRes.json();
        const bookingsData = await bookingsRes.json();
        const toursData = await toursRes.json();
        const messagesData = await messagesRes.json();
        const amenitiesData = await amenitiesRes.json();
        const galleryData = await galleryRes.json();
        const subscribersData = await subscribersRes.json();
        const testimonialsData = await testimonialsRes.json();

        // Update stats
        setStats({
          plans: plansData?.length || 0,
          bookings: bookingsData?.bookings?.length || 0,
          tours: toursData?.length || 0,
          messages: messagesData?.messages?.length || 0,
          amenities: amenitiesData?.length || 0,
          gallery: galleryData?.length || 0,
          subscribers: subscribersData?.subscriptions?.length || 0,
          testimonials: testimonialsData?.length || 0,
        });

        // Update recent data
        setRecentData({
          bookings: bookingsData?.bookings?.slice(0, 5) || [],
          tours: toursData?.slice(0, 5) || [],
          messages: messagesData?.messages?.slice(0, 5) || [],
          testimonials: testimonialsData?.slice(0, 5) || [],
        });

      } catch (err) {
        console.error('Dashboard fetch error:', err);
        toast.error("Failed to fetch some dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Prepare data for charts
  const bookingTrendData = [
    { name: 'Jan', value: Math.floor(Math.random() * 20) },
    { name: 'Feb', value: Math.floor(Math.random() * 20) },
    { name: 'Mar', value: Math.floor(Math.random() * 20) },
    { name: 'Apr', value: Math.floor(Math.random() * 20) },
    { name: 'May', value: Math.floor(Math.random() * 20) },
    { name: 'Jun', value: Math.floor(Math.random() * 20) },
  ];

  const resourceData = [
    { name: 'Plans', value: stats.plans },
    { name: 'Amenities', value: stats.amenities },
    { name: 'Gallery', value: stats.gallery },
    { name: 'Testimonials', value: stats.testimonials },
  ];

  return (
    <div className="space-y-6 min-h-screen bg-gray-50">
      <h2 className="text-3xl font-bold text-[#2d386a] tracking-tight">Dashboard Overview</h2>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7e87f8]"></div>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              title="Active Plans"
              value={stats.plans}
              icon={<Wallet size={20} />}
              trend="up"
            />
            <StatCard
              title="Total Bookings"
              value={stats.bookings}
              icon={<LayoutDashboard size={20} />}
              trend="up"
            />
            <StatCard
              title="Tour Requests"
              value={stats.tours}
              icon={<Calendar size={20} />}
              trend="neutral"
            />
            <StatCard
              title="Messages"
              value={stats.messages}
              icon={<MessageCircle size={20} />}
              trend="down"
            />
            <StatCard
              title="Subscribers"
              value={stats.subscribers}
              icon={<Mail size={20} />}
              trend="up"
            />
            <StatCard
              title="Amenities"
              value={stats.amenities}
              icon={<User size={20} />}
              trend="neutral"
            />
            <StatCard
              title="Gallery Items"
              value={stats.gallery}
              icon={<ImageIcon size={20} />}
              trend="up"
            />
            <StatCard
              title="Testimonials"
              value={stats.testimonials}
              icon={<Star size={20} />}
              trend="up"
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ChartCard title="Booking Trends">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={bookingTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#7e87f8"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Resource Distribution">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={resourceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${percent !== undefined ? (percent * 100).toFixed(0) : '0'}%`
                    }
                  >
                    {resourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Recent Activity">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={bookingTrendData.slice(0, 4)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* Data Tables Row */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <DataTableCard
    title="Recent Tour Requests"
    data={recentData.tours}
    columns={[
      { key: 'name', header: 'Name' },
      { key: 'phone', header: 'Phone' },
      { key: 'date', header: 'Date' },
      { key: 'time', header: 'Time' },
      {
        key: 'status',
        header: 'Status',
        render: (value: unknown) => (
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${
              value === 'Confirmed'
                ? 'bg-green-100 text-green-700'
                : value === 'Pending'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-red-100 text-red-600'
            }`}
          >
            {typeof value === 'string' ? value : 'Pending'}
          </span>
        )
      }
    ]}
  />

  <DataTableCard
    title="Recent Messages"
    data={recentData.messages}
    columns={[
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
      { key: 'subject', header: 'Subject' },
      {
        key: 'status',
        header: 'Status',
        render: (value: unknown) => (
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${
              value === 'read'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {typeof value === 'string' ? value : 'unread'}
          </span>
        )
      }
    ]}
  />
</div>


          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4 text-[#2d386a]">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <ActionButton
                icon={<FaPlus size={16} />}
                label="Add New Plan"
                 onClick={() => router.push('/admin/plans/add')}
              />
              <ActionButton
                icon={<ImageIcon size={16} />}
                label="Manage Gallery"
                onClick={() => router.push('/admin/gallery')}
              />
              <ActionButton
                icon={<User size={16} />}
                label="View Amenities"
                onClick={() => router.push('/admin/amenities')}
              />
              <ActionButton
                icon={<Star size={16} />}
                label="Add Testimonial"
                onClick={() => router.push('/admin/testimonials/add')}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function StatCard({ title, value, icon, trend }: {
  title: string;
  value: number;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
}) {
  const trendColor = trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-gray-500';
  const trendIcon = trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→';

  return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className={`p-2 rounded-lg bg-[#f0f2ff] text-[#7e87f8]`}>
          {icon}
        </div>
      </div>
      <div className="mt-2 flex items-center text-sm">
        <span className={`mr-1 ${trendColor}`}>{trendIcon}</span>
        <span className="text-gray-500">vs last week</span>
      </div>
    </div>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
}

type Column = {
  key: string;
  header: string;
  render?: (value: unknown) => React.ReactNode;
};

type DataTableCardProps = {
  title: string;
  data: Record<string, unknown>[];
  columns: Column[];
};

function DataTableCard({ title, data, columns }: DataTableCardProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      {data.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item, index) => (
                <tr key={index}>
                  {columns.map((col) => (
                    <td
                      key={`${index}-${col.key}`}
                      className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"
                    >
                      {col.render
                        ? col.render(item[col.key])
                        : item[col.key] !== undefined && item[col.key] !== null
                        ? String(item[col.key])
                        : '—'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-4 text-center text-gray-500">No data available</div>
      )}
    </div>
  );
}


function ActionButton({ icon, label, onClick }: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
    >
      <span className="text-[#7e87f8]">{icon}</span>
      <span className="font-medium">{label}</span>
    </button>
  );
}