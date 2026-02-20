import { PrismaClient } from '@prisma/client';
import { Users, DollarSign, Activity, ShoppingCart, TrendingUp, TrendingDown, ArrowUpRight, Settings, UserPlus, BarChart2, RefreshCw, Shield, Clock, ChevronRight } from 'lucide-react';

const globalForPrisma = global;
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

async function getSystemStats() {
    const totalUsers = await prisma.user.count();
    const totalOrders = await prisma.order.count();
    const revenueResult = await prisma.order.aggregate({
        _sum: { finalPrice: true },
        where: { status: 'COMPLETED' },
    });
    const totalRevenue = revenueResult._sum.finalPrice || 0;
    return { totalUsers, totalOrders, totalRevenue };
}

export default async function OwnerDashboard() {
    const stats = await getSystemStats();

    const statCards = [
        { icon: Users, label: 'Total Users', value: stats.totalUsers.toLocaleString(), change: '+12%', positive: true, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { icon: DollarSign, label: 'Total Revenue', value: `Rp${stats.totalRevenue.toLocaleString('id-ID')}`, change: '+8.2%', positive: true, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { icon: ShoppingCart, label: 'Total Orders', value: stats.totalOrders.toLocaleString(), change: '+5.1%', positive: true, color: 'text-violet-600', bg: 'bg-violet-50' },
        { icon: Activity, label: 'Platform Health', value: '99.9%', change: 'Uptime', positive: true, color: 'text-amber-600', bg: 'bg-amber-50' },
    ];

    const quickActions = [
        { icon: UserPlus, label: 'Add User', desc: 'Create new user account', href: '/dashboard/owner/users', color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { icon: Shield, label: 'Manage Roles', desc: 'Configure permissions', href: '/dashboard/owner/roles', color: 'text-violet-600', bg: 'bg-violet-50' },
        { icon: BarChart2, label: 'View Reports', desc: 'Analytics & reports', href: '/dashboard/owner/services', color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { icon: Settings, label: 'Settings', desc: 'Platform configuration', href: '/dashboard/owner', color: 'text-slate-600', bg: 'bg-slate-100' },
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Page Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-semibold px-2 py-0.5 bg-red-50 text-red-600 rounded-full border border-red-100">Owner Access</span>
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900">Owner Dashboard</h1>
                        <p className="text-sm text-slate-500 mt-1">Platform administration and system monitoring</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <a href="/dashboard/owner/users" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                            <Users size={14} /> Manage Users
                        </a>
                        <a href="/dashboard/owner/roles" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">
                            <Shield size={14} /> Roles
                        </a>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {statCards.map((card, i) => (
                        <div key={i} className="bg-white border border-slate-200 rounded-lg p-5 hover:shadow-sm transition-all">
                            <div className="flex items-start justify-between">
                                <div className={`w-10 h-10 rounded-lg ${card.bg} flex items-center justify-center flex-shrink-0`}>
                                    <card.icon size={20} className={card.color} />
                                </div>
                                <span className={`flex items-center gap-1 text-xs font-semibold ${
                                    card.positive ? 'text-emerald-600' : 'text-red-500'
                                }`}>
                                    {card.positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                    {card.change}
                                </span>
                            </div>
                            <div className="mt-4">
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">{card.label}</p>
                                <p className="text-2xl font-bold text-slate-900">{card.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Actions & Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Quick Actions */}
                    <div className="bg-white border border-slate-200 rounded-lg">
                        <div className="px-5 py-4 border-b border-slate-100">
                            <h2 className="text-sm font-semibold text-slate-900">Quick Actions</h2>
                        </div>
                        <div className="p-3 space-y-1">
                            {quickActions.map((action, i) => (
                                <a key={i} href={action.href} className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-slate-50 transition-colors group">
                                    <div className={`w-8 h-8 rounded-lg ${action.bg} flex items-center justify-center flex-shrink-0`}>
                                        <action.icon size={16} className={action.color} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-slate-900">{action.label}</p>
                                        <p className="text-xs text-slate-500">{action.desc}</p>
                                    </div>
                                    <ChevronRight size={14} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* System Status */}
                    <div className="lg:col-span-2 bg-white border border-slate-200 rounded-lg">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                            <h2 className="text-sm font-semibold text-slate-900">System Status</h2>
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                All Systems Operational
                            </div>
                        </div>
                        <div className="p-5">
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { label: 'API Response', value: '124ms', status: 'good' },
                                    { label: 'Database', value: 'Connected', status: 'good' },
                                    { label: 'Blockchain RPC', value: 'Active', status: 'good' },
                                    { label: 'Last Backup', value: '2h ago', status: 'warning' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                        <div>
                                            <p className="text-xs text-slate-500">{item.label}</p>
                                            <p className="text-sm font-semibold text-slate-900 mt-0.5">{item.value}</p>
                                        </div>
                                        <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                                            item.status === 'good' ? 'bg-emerald-500' : 'bg-amber-500'
                                        }`}></span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Summary Row */}
                <div className="bg-white border border-slate-200 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-sm font-semibold text-slate-900">Platform Summary</h2>
                            <p className="text-xs text-slate-500 mt-0.5">{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-slate-900">{stats.totalUsers}</p>
                                <p className="text-xs text-slate-500">Users</p>
                            </div>
                            <div className="w-px h-10 bg-slate-200"></div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-slate-900">{stats.totalOrders}</p>
                                <p className="text-xs text-slate-500">Orders</p>
                            </div>
                            <div className="w-px h-10 bg-slate-200"></div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-emerald-600">Rp{(stats.totalRevenue / 1000000).toFixed(1)}M</p>
                                <p className="text-xs text-slate-500">Revenue</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
