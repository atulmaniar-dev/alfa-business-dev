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
  TrendingUp,
  TrendingDown,
  Users,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  ChevronRight,
  CheckCircle,
  Bell
} from 'lucide-react';
import { FaPlus } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, AreaChart, Area } from 'recharts';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import Button from '../components/ui/Button';
import Skeleton from '../components/ui/Skeleton';

const COLORS = ['#7e87f8', '#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F'];

interface StatsData {
  plans: number;
  bookings: number;
  tours: number;
  messages: number;
  amenities: number;
  gallery: number;
  subscribers: number;
  testimonials: number;
}

interface Booking {
  _id: string;
  fullName: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  status: 'read' | 'unread';
  createdAt: string;
}

interface Testimonial {
  _id: string;
  name: string;
  title: string;
  status: 'Approved' | 'Pending' | 'Rejected';
  message: string;
}

interface RecentData {
  bookings: Booking[];
  messages: Message[];
  testimonials: Testimonial[];
}

interface ChartData {
  name: string;
  value: number;
}

interface BookingTrendData {
  name: string;
  bookings: number;
  revenue: number;
}

interface ActivityData {
  name: string;
  current: number;
  previous: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<StatsData>({
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
  const [recentData, setRecentData] = useState<RecentData>({
    bookings: [],
    messages: [],
    testimonials: [],
  });

  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [bookingTrends, setBookingTrends] = useState<BookingTrendData[]>([]);
  const [activityData, setActivityData] = useState<ActivityData[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);

      // Fetch all data in parallel
      const [
        plansRes,
        bookingsRes,
        messagesRes,
        amenitiesRes,
        galleryRes,
        subscribersRes,
        testimonialsRes,
      ] = await Promise.allSettled([
        fetch('/api/plans'),
        fetch('/api/book-tour'),
        fetch('/api/contact'),
        fetch('/api/amenities'),
        fetch('/api/gallery'),
        fetch('/api/subscribe'),
        fetch('/api/testimonials'),
      ]);

      // Process responses
      const plansData = plansRes.status === 'fulfilled' ? await plansRes.value.json() : [];
      const bookingsData = bookingsRes.status === 'fulfilled' ? await bookingsRes.value.json() : { bookings: [] };
      const messagesData = messagesRes.status === 'fulfilled' ? await messagesRes.value.json() : { messages: [] };
      const amenitiesData = amenitiesRes.status === 'fulfilled' ? await amenitiesRes.value.json() : [];
      const galleryData = galleryRes.status === 'fulfilled' ? await galleryRes.value.json() : [];
      const subscribersData = subscribersRes.status === 'fulfilled' ? await subscribersRes.value.json() : { subscriptions: [] };
      const testimonialsData = testimonialsRes.status === 'fulfilled' ? await testimonialsRes.value.json() : [];

      // Update stats
      const newStats: StatsData = {
        plans: plansData?.length || 0,
        bookings: bookingsData?.bookings?.length || 0,
        tours: bookingsData?.bookings?.length || 0, // Same as bookings
        messages: messagesData?.messages?.length || 0,
        amenities: amenitiesData?.length || 0,
        gallery: galleryData?.length || 0,
        subscribers: subscribersData?.subscriptions?.length || 0,
        testimonials: testimonialsData?.length || 0,
      };
      setStats(newStats);

      // Prepare chart data
      const resourceChartData: ChartData[] = [
        { name: 'Plans', value: newStats.plans },
        { name: 'Amenities', value: newStats.amenities },
        { name: 'Gallery', value: newStats.gallery },
        { name: 'Testimonials', value: newStats.testimonials },
        { name: 'Subscribers', value: newStats.subscribers },
      ];
      setChartData(resourceChartData);

      // Prepare booking trends (last 6 months simulation)
      const trends: BookingTrendData[] = generateBookingTrends(bookingsData?.bookings || []);
      setBookingTrends(trends);

      // Prepare activity data
      const activity: ActivityData[] = generateActivityData(newStats);
      setActivityData(activity);

      // Update recent data
      setRecentData({
        bookings: (bookingsData?.bookings?.slice(0, 5) || []) as Booking[],
        messages: (messagesData?.messages?.slice(0, 5) || []) as Message[],
        testimonials: (testimonialsData?.slice(0, 5) || []) as Testimonial[],
      });

    } catch (err) {
      console.error('Dashboard fetch error:', err);
      toast.error("Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const generateBookingTrends = (bookings: any[]): BookingTrendData[] => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map((month, index) => ({
      name: month,
      bookings: Math.floor(Math.random() * 20) + 5,
      revenue: Math.floor(Math.random() * 50000) + 10000,
    }));
  };

  const generateActivityData = (stats: StatsData): ActivityData[] => {
    return [
      { name: 'Plans', current: stats.plans, previous: Math.max(0, stats.plans - 2) },
      { name: 'Bookings', current: stats.bookings, previous: Math.max(0, stats.bookings - 5) },
      { name: 'Messages', current: stats.messages, previous: Math.max(0, stats.messages - 3) },
      { name: 'Testimonials', current: stats.testimonials, previous: Math.max(0, stats.testimonials - 1) },
    ];
  };

  const getGrowthPercentage = (current: number, previous: number) => {
    if (previous === 0) return 100;
    return ((current - previous) / previous) * 100;
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'approved':
      case 'done':
      case 'read':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here&apos;s what&apos;s happening with your business today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
          
            onClick={fetchAllData}
            className="gap-2 cursor-pointer"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Header Stats - Main Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Bookings Card - Primary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="rounded-2xl shadow-xl p-6 transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium">Total Bookings</span>
                </div>
                <h3 className="text-3xl font-bold tracking-tight">
                  {stats.bookings}
                </h3>
                <div className="flex items-center gap-2 mt-4">
                  <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
                    <ArrowUpRight className="h-4 w-4" />
                    <span className="text-sm font-medium">8.2%</span>
                  </div>
                  <span className="text-sm ">from last month</span>
                </div>
              </div>
              <div className="opacity-20">
                <svg className="h-16 w-16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-white/20">
              <div className="flex items-center justify-between">
                <span className="text-sm">Active tours</span>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
                  <span className="text-sm font-medium">Live</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* New Messages Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
            {stats.messages > 5 && (
              <div className="absolute -top-2 -right-2">
                <div className="relative">
                  <div className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-purple-400 opacity-75"></div>
                  <div className="relative inline-flex h-6 w-6 rounded-full bg-purple-500 items-center justify-center">
                    <Bell className="h-3 w-3 text-white" />
                  </div>
                </div>
              </div>
            )}
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-purple-50 group-hover:bg-purple-100 transition-colors">
                <MessageCircle className="h-6 w-6 text-purple-600" />
              </div>
              <Badge variant={stats.messages > 5 ? "destructive" : "secondary"}>
                {stats.messages > 5 ? "Attention" : "Normal"}
              </Badge>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {stats.messages}
            </h3>
            <p className="text-sm text-gray-600 mb-4">New Messages</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Trend</span>
                <div className="flex items-center gap-1">
                  {stats.messages > 5 ? (
                    <ArrowUpRight className="h-4 w-4 text-red-500" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-green-500" />
                  )}
                  <span className={`text-sm font-medium ${stats.messages > 5 ? 'text-red-600' : 'text-green-600'
                    }`}>
                    {stats.messages > 5 ? "15.3%" : "5.2%"}
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full ${stats.messages > 10 ? 'bg-red-500' :
                      stats.messages > 5 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                  style={{ width: `${Math.min(stats.messages * 10, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Active Plans Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-orange-50 group-hover:bg-orange-100 transition-colors">
                <Package className="h-6 w-6 text-orange-600" />
              </div>
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center">
                  <span className="text-white font-bold">{stats.plans}</span>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {stats.plans}
            </h3>
            <p className="text-sm text-gray-600 mb-4">Active Plans</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-100 rounded-lg p-3">
                <div className="text-xs text-gray-500 mb-1">Published</div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">All Plans</span>
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <button
                onClick={() => router.push('/admin/plans')}
                className="text-sm cursor-pointer text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1"
              >
                View All
                <ChevronRight className="h-4 w-4" />
              </button>
              <div className="text-xs text-gray-500">
                Updated today
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Secondary Stats Grid - 4 Cards Now */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {/* Subscribers Card - Now Primary */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg p-5 text-white hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xl font-bold">{stats.subscribers}</h4>
                  <p className="text-sm text-blue-100">Subscribers</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end gap-1 mb-1">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-medium">22.1%</span>
                </div>
                <span className="text-xs text-blue-200">Newsletter</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="flex items-center justify-between text-sm">
                <span className="text-blue-200">Growth</span>
                <span className="font-medium">+{Math.floor(stats.subscribers / 10)} this week</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Testimonials Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition-all duration-200 group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-500 to-amber-500 text-white">
                  <Star className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{stats.testimonials}</h4>
                  <p className="text-xs text-gray-500">Testimonials</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end gap-1 mb-1">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium text-green-600">18.4%</span>
                </div>
                <span className="text-xs text-gray-400">Client reviews</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <div className="text-xs text-gray-500 mb-1">Approved</div>
                  <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-500"
                      style={{ width: `${Math.min((stats.testimonials / 50) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3 flex justify-end">
              <button
                onClick={() => router.push('/admin/testimonials')}
                className="text-xs cursor-pointer text-gray-500 hover:text-gray-700 flex items-center gap-1"
              >
                Manage
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Gallery Items Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition-all duration-200 group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-500 text-white">
                  <ImageIcon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{stats.gallery}</h4>
                  <p className="text-xs text-gray-500">Gallery Items</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end gap-1 mb-1">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium text-green-600">9.7%</span>
                </div>
                <span className="text-xs text-gray-400">Media assets</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-6 w-6 rounded-full bg-teal-100 border-2 border-white"></div>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">+{Math.floor(stats.gallery / 4)} categories</span>
                </div>
                <button
                  onClick={() => router.push('/admin/gallery')}
                  className="p-1 cursor-pointer rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <ChevronRight className="h-4 w-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Amenities Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.25 }}
        >
          <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition-all duration-200 group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 text-white">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{stats.amenities}</h4>
                  <p className="text-xs text-gray-500">Amenities</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end gap-1 mb-1">
                  <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                  <span className="text-sm font-medium text-gray-600">Stable</span>
                </div>
                <span className="text-xs text-gray-400">Features</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="text-xs font-medium text-gray-700">All active</span>
                  </div>
                </div>
                <button
                  onClick={() => router.push('/admin/amenities')}
                  className="text-xs cursor-pointer text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
                >
                  Manage
                  <ChevronRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Booking Trends</CardTitle>
            <CardDescription>Last 6 months performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={bookingTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="bookings"
                  stroke="#7e87f8"
                  fill="url(#colorBookings)"
                  strokeWidth={2}
                />
                <defs>
                  <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7e87f8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#7e87f8" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Resource Distribution</CardTitle>
            <CardDescription>Content breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${percent ? (percent * 100).toFixed(0) : '0'}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Activity Chart */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Monthly Activity</CardTitle>
          <CardDescription>Comparison with previous month</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="previous"
                name="Last Month"
                fill="#cbd5e1"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="current"
                name="This Month"
                fill="#7e87f8"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Data Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Recent Tour Requests</span>
              <Badge variant="secondary">{recentData.bookings.length}</Badge>
            </CardTitle>
            <CardDescription>Latest booking inquiries</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentData.bookings.map((booking) => (
                  <TableRow key={booking._id}>
                    <TableCell className="font-medium">
                      {booking.fullName}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-500">
                        {formatDate(booking.preferredDate)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
                {recentData.bookings.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-gray-500 py-4">
                      No recent bookings
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            {recentData.bookings.length > 0 && (
              <Button
                
                className="w-full cursor-pointer mt-4"
                onClick={() => router.push('/admin/tour')}
              >
                View All Bookings
              </Button>
            )}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Recent Messages</span>
              <Badge variant="secondary">{recentData.messages.length}</Badge>
            </CardTitle>
            <CardDescription>Customer inquiries</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentData.messages.map((message) => (
                  <TableRow key={message._id}>
                    <TableCell className="font-medium">
                      {message.name}
                    </TableCell>
                    <TableCell className="max-w-[150px] truncate">
                      {message.subject}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(message.status)}>
                        {message.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
                {recentData.messages.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-gray-500 py-4">
                      No recent messages
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            {recentData.messages.length > 0 && (
              <Button
                className="w-full cursor-pointer mt-4"
                onClick={() => router.push('/admin/contact')}
              >
                View All Messages
              </Button>
            )}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Recent Testimonials</span>
              <Badge variant="secondary">{recentData.testimonials.length}</Badge>
            </CardTitle>
            <CardDescription>Client feedback</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentData.testimonials.map((testimonial) => (
                  <TableRow key={testimonial._id}>
                    <TableCell className="font-medium">
                      {testimonial.name}
                    </TableCell>
                    <TableCell className="max-w-[120px] truncate">
                      {testimonial.title}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(testimonial.status)}>
                        {testimonial.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
                {recentData.testimonials.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-gray-500 py-4">
                      No recent testimonials
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            {recentData.testimonials.length > 0 && (
              <Button
               
                className="w-full cursor-pointer mt-4"
                onClick={() => router.push('/admin/testimonials')}
              >
                View All Testimonials
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <QuickAction
              icon={<FaPlus className="h-5 w-5 cursor-pointer" />}
              label="Add New Plan"
              description="Create pricing plan"
              onClick={() => router.push('/admin/plans/add')}
              color="bg-blue-50 text-blue-600 border-blue-200"
            />
            <QuickAction
              icon={<ImageIcon className="h-5 w-5 cursor-pointer" />}
              label="Manage Gallery"
              description="Upload images"
              onClick={() => router.push('/admin/gallery')}
              color="bg-purple-50 text-purple-600 border-purple-200"
            />
            <QuickAction
              icon={<Users className="h-5 w-5 cursor-pointer" />}
              label="View Amenities"
              description="Manage features"
              onClick={() => router.push('/admin/amenities')}
              color="bg-green-50 text-green-600 border-green-200"
            />
            <QuickAction
              icon={<Star className="h-5 w-5 cursor-pointer" />}
              label="Add Testimonial"
              description="Client reviews"
              onClick={() => router.push('/admin/testimonials/add')}
              color="bg-yellow-50 text-yellow-600 border-yellow-200"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  trend,
  trendValue,
  description,
  color,
  compact = false
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  description?: string;
  color?: string;
  compact?: boolean;
}) {
  const TrendIcon = trend === 'up' ? ArrowUpRight : trend === 'down' ? ArrowDownRight : TrendingUp;
  const trendColor = trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardContent className={`p-6 ${compact ? 'pb-4' : ''}`}>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600">{title}</p>
              <p className={`${compact ? 'text-2xl' : 'text-3xl'} font-bold text-gray-900`}>
                {value}
              </p>
              {description && (
                <p className="text-sm text-gray-500">{description}</p>
              )}
              {trendValue && (
                <div className="flex items-center gap-1">
                  <TrendIcon className={`h-4 w-4 ${trendColor}`} />
                  <span className={`text-sm font-medium ${trendColor}`}>
                    {trendValue}
                  </span>
                </div>
              )}
            </div>
            <div className={`p-3 rounded-xl ${color || 'bg-blue-50'}`}>
              <div className="text-white">
                {icon}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function QuickAction({
  icon,
  label,
  description,
  onClick,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
  onClick: () => void;
  color: string;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 hover:shadow-md transition-all duration-200 ${color}`}
    >
      <div className="mb-3">{icon}</div>
      <h3 className="font-semibold text-lg mb-1">{label}</h3>
      <p className="text-sm opacity-75">{description}</p>
    </motion.button>
  );
}

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 space-y-6">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-3">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-32" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <Skeleton className="h-12 w-12 rounded-xl" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <Card key={i} className="border-0 shadow-lg">
            <CardHeader>
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-48" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tables Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-8" />
              </div>
              <Skeleton className="h-4 w-48" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="flex items-center justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}