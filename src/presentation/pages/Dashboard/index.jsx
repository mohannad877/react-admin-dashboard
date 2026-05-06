import { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Users, Package, AlertTriangle, TrendingUp, ShoppingCart, Activity } from 'lucide-react';
import { userRepository } from '../../../infrastructure/repositories/UserRepository';
import { productRepository } from '../../../infrastructure/repositories/ProductRepository';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';

const userGrowthData = [
  { month: 'يناير', count: 8 },
  { month: 'فبراير', count: 14 },
  { month: 'مارس', count: 19 },
  { month: 'أبريل', count: 28 },
  { month: 'مايو', count: 35 },
  { month: 'يونيو', count: 42 },
];

const COLORS = ['#0D9488', '#94a3b8', '#F59E0B', '#EF4444'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 shadow-xl">
        {label && <p className="text-slate-300 text-xs mb-1">{label}</p>}
        {payload.map((entry, i) => (
          <p key={i} className="text-white text-sm font-semibold">
            {entry.value?.toLocaleString('ar-SA')}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, productsRes] = await Promise.all([
          userRepository.getAll(),
          productRepository.getAll()
        ]);
        setUsers(usersRes);
        setProducts(productsRes);
      } catch (error) {
        console.error('خطأ في جلب البيانات:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = useMemo(() => [
    { 
      title: 'إجمالي المستخدمين', 
      value: users.length, 
      icon: Users, 
      trend: '+12%', 
      positive: true,
      color: 'text-teal-600 dark:text-teal-400',
      bg: 'bg-teal-50 dark:bg-teal-500/10',
    },
    { 
      title: 'المستخدمين النشطين', 
      value: users.filter(u => u.status === 'active').length, 
      icon: Activity, 
      trend: '+8%', 
      positive: true,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-500/10',
    },
    { 
      title: 'إجمالي المنتجات', 
      value: products.length, 
      icon: Package, 
      trend: '+3', 
      positive: true,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-500/10',
    },
    { 
      title: 'مخزون منخفض', 
      value: products.filter(p => p.stock <= 10 && p.stock > 0).length, 
      icon: AlertTriangle, 
      trend: 'تنبيه', 
      positive: false,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-500/10',
    }
  ], [users, products]);

  const productCategoryData = useMemo(() => {
    const categories = products.reduce((acc, p) => {
      const labels = { electronics: 'إلكترونيات', furniture: 'أثاث', supplies: 'مستلزمات', other: 'أخرى' };
      const cat = labels[p.category] || 'أخرى';
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(categories).map(([name, value]) => ({ name, value }));
  }, [products]);

  const userStatusData = useMemo(() => [
    { name: 'نشط', value: users.filter(u => u.status === 'active').length },
    { name: 'غير نشط', value: users.filter(u => u.status === 'inactive').length }
  ], [users]);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-lg w-48"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-72 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Helmet>
        <title>لوحة التحكم | Admin Dashboard</title>
        <meta name="description" content="نظرة عامة شاملة على إحصائيات المستخدمين والمنتجات والأداء." />
      </Helmet>

      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">مرحباً، المسؤول 👋</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">نظرة عامة على إحصائيات النظام</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div 
              key={idx} 
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{stat.title}</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                    {stat.value.toLocaleString('ar-SA')}
                  </p>
                  <p className={`text-xs font-medium ${stat.positive ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                    {stat.trend}
                  </p>
                </div>
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Area Chart - User Growth */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
          <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">نمو المستخدمين</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">آخر 6 أشهر</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={userGrowthData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d9488" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="count" stroke="#0d9488" strokeWidth={2.5} fill="url(#colorCount)" dot={{ fill: '#0d9488', r: 4 }} activeDot={{ r: 6 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart - Product Categories */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
          <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">المنتجات حسب التصنيف</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">توزيع المخزون</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productCategoryData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(13,148,136,0.05)' }} />
                <Bar dataKey="value" fill="#0d9488" radius={[6, 6, 0, 0]} maxBarSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart - User Status */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
          <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">حالة المستخدمين</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">نشط / غير نشط</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                  fontSize={11}
                >
                  {userStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
